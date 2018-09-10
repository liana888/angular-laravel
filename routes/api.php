<?php

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth',
    'namespace' => 'Api'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('forgot', 'AuthController@forgot');
    Route::post('newPassword', 'AuthController@newPassword');
    Route::get('verify/{token}', 'AuthController@verify');

});


Route::group([
    'middleware' => ['api', 'auth:api'],
    'namespace' => 'Api'
], function () {
    Route::post('product-avatar/{product_id}', 'ProductController@uploadAvatar');
    Route::resource('products', 'ProductController');
});
