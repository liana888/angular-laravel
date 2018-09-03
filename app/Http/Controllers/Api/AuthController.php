<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\loginRequest;
use App\Http\Requests\EmailSendRequest;
use App\Mail\ForgotPasswordEmail;
use App\Mail\VerificationEmail;
use App\Models\User;
use App\Models\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'verify', 'forgot', 'newPassword']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


    /**
     * @param RegisterRequest $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {
        $createParams = array_merge($request->all(), ['activation_token' => str_random(128)]);
        $createdUser  = User::query()->create($createParams);

        if(!empty($createdUser)) {
            try {
                $mailSend = Mail::to($createdUser)
                    ->queue(new VerificationEmail($createdUser));

                if($mailSend) {
                    return response()->json(['message' => 'Please verify your account.']);
                }

                return response('Oops something went wrong.', 500);
            } catch (\Exception $exception) {
                return response($exception->getMessage());
            }
        }

        return response('Oops something went wrong.', 500);
    }


    /**
     * @param $token
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function verify($token)
    {
        $user = User::query()
            ->where('activation_token', '=', $token)
            ->first();

        if(!empty($user)) {
            if(! $user->update(['activation_token' => NULL]) ) {
                return response('Error during verification.', 500);
            }

            return response()->json(['message' => 'Successfully verified.']);
        }

        return response('Forbidden', 403);

    }

    public function forgot(EmailSendRequest $request){
        $email = $request['email'];
        $user = User::query()
            ->where('email', '=', $email)
            ->first();
        $token = str_random(64);
        if(!empty($user)){
            try{
                PasswordReset::query()->create(['email' => $email, 'token' => $token]);
                Mail::to($request->input('email'))
                ->queue(new ForgotPasswordEmail($user, $token));
            } catch (\Exception $exception) {
                dd($exception->getMessage());
                return response('Oops something went wrong.', 500);
            }

            return response() ->json(['massage' =>'Check your email']);
        }
        return response()->json(['message' => 'Invalid Email'] , 403);
    }

    public function newPassword(ResetPasswordRequest $request){
        $email = PasswordReset::query()->where('token' , '=' , $request['token'])
        ->first()->getAttribute('email');
        $user =  User::query()->where('email','=', $email)
        ->first();
        $updated = $user->update(['password' => $request->input('password')]);
        if($updated) {
            return response()->json(['message' => 'Your password has been changed. Please Log In']);
        } else {
            return response()->json(['message' => 'Somethin went wrong , please try agail'] , 500);
        }
    }
}









