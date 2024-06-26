<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'WelcomeController@show');

Route::get('/posts/{id}', 'PostController@show');

Route::get('/about-us', 'AboutUsController@index');

Route::get('/contact', 'ContactController@index');


