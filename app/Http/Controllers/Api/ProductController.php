<?php

namespace App\Http\Controllers\Api;

use App\Models\Products;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $keyWord = $request->get('filters');

        $products = Products::query()
            ->select(['id', 'name', 'price', 'short_description', 'views', 'user_id', 'created_at'])
            ->with(['user' => function($query) {
                $query->select(['id', 'name']);
            }])
            ->where('name', 'like',  '%' . $keyWord . '%')
            ->paginate(2);


        return response()->json([
            'products' => $products->items(),
            'pagination' => [
                'per_page' => $products->perPage(),
                'current_page' => $products->currentPage(),
                'total' => $products->total(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->request->add(['user_id' => auth()->user()->id]);

        $created = Products::query()
            ->create($request->all());

        return response()->json(['success' => (bool) $created, 'id' => $created->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Products::query()
            ->select(['id', 'name', 'price', 'short_description', 'views', 'user_id', 'created_at', 'description'])
            ->with(['user' => function($query) {
                $query->select(['id', 'name']);
            }]);

        $product->increment('views');

        return  response()->json(['product' => $product->find($id)]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->request->add(['user_id' => auth()->user()->id]);
        $update = Products::query()
            ->where('id', '=', $id)
            ->update($request->only(['description', 'name', 'price', 'short_description', 'user_id']));

        return response()->json(['success' => $update]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Products::query()->find($id)->delete();
    }

    public function uploadAvatar(Request $request, $productId){
        $avatar = $request->file('avatar');
        $avatar->storeAs('/public/products/', $productId . '.jpg');
    }
}
