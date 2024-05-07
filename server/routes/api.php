<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'auth', 'middleware' => 'api'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/profile', [AuthController::class, 'profile']);
    Route::get('/checkTokenExpiration', [AuthController::class, 'checkTokenExpiration']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Broadcast::routes(['middleware' => 'api']);

Route::group(['prefix' => 'conversation', 'middleware' => 'api'], function () {
    Route::get('/', [ConversationController::class, 'getConversations']);
    Route::post('/changeUserRole', [ConversationController::class, 'changeUserRole']);
    Route::post('/blockUser', [ConversationController::class, 'blockUser']);
});
