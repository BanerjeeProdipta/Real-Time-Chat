<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});
Route::post('/tweets', 'TweetsController@store')->middleware('auth');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
