<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email', // unique:users,email means that the email field must be unique in the users table
            'password' => 'required|string|confirmed', // confirmed means that the password field must be confirmed by the user
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Create a token for the user
        $token = $user->createToken('myapptoken')->plainTextToken;

        // Return the token as a response
        $response = [
            'user' => $user,
            'token' => $token,
        ];

        // Return the response as JSON
        return response()->json($response, 201);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        // Check password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => 'Bad creds',
            ], 401);
        }

        // Create a token for the user
        $token = $user->createToken('myapptoken')->plainTextToken;

        // Return the token as a response
        $response = [
            'user' => $user,
            'token' => $token,
        ];

        // Return the response as JSON
        return response()->json($response, 201);
    }
}
