Hi {{ $user->name }}
<br>
Please click here to verify your account <a href="{{ url('/#!/activate-profile/' . $user->activation_token) }}" >here</a>
