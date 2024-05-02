<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh']]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:5|max:100'
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->errors()], 422);
        }
        if (!$token = Auth::attempt($validator->validated())) {
            return response()->json(['success' => false, 'error' => ['email' => ['Wrong account or password'], 'password' => ['Wrong account or password']]], 401);
        }

        $refreshToken = $this->createRefreshToken();

        return $this->createNewToken($token, $refreshToken);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:5|max:100',
        ]);
        if ($validator->fails()) {
            return response()->json(['success' => false, 'error' => $validator->errors()], 400);
        }
        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => Hash::make($request->password)]
        ));

        $token =  Auth::login($user);

        $refreshToken = $this->createRefreshToken();

        return $this->createNewToken($token, $refreshToken);
    }

    public function profile()
    {
        try {
            return response()->json(Auth::user());
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
        }
    }

    public function logout()
    {
        try {
            Auth::logout();
            return response()->json(['success' => true, 'message' => 'User successfully signed out']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function refresh()
    {
        $refreshToken = request()->refresh_token;
        try {
            $decoded = JWTAuth::getJWTProvider()->decode($refreshToken);

            $user = User::find($decoded['sub']);

            if (!$user) return response()->json(['success' => false, 'error' => 'User not found', 404]);

            Auth::invalidate();

            $token = Auth::login($user);
            $refreshToken = $this->createRefreshToken();

            return $this->createNewToken($token, $refreshToken);
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'error' => 'Refresh token Invalid'], 500);
        }
    }

    private function createNewToken($token, $refreshToken)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'access_token' => $token,
                'refresh_token' => $refreshToken,
                'token_type' => 'bearer',
                'expires_in' => Auth::factory()->getTTL() * 60,
                'user' => Auth::user()
            ]
        ]);
    }

    private function createRefreshToken()
    {
        $data = [
            'sub' => Auth::user()->id,
            'random' => rand() . time(),
            'exp' => time() + config('jwt.refresh_ttl')
        ];

        $refreshToken = JWTAuth::getJWTProvider()->encode($data);

        return $refreshToken;
    }
}
