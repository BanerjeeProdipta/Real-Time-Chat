<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use App\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function chat(){

        return view('chat');
    }

    public function send(Request $request){

        $this->saveToSession($request);
        event((new ChatEvent( $request->message, auth()->user())));
    }

    public function saveToSession($request){
        session()->put('chat', $request->message);
    }
    
}
