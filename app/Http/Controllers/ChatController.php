<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function chat(){

        return view('chat');
    }

    public function send(Request $request){
       
        event((new ChatEvent(auth()->user(),$message)));
    }
}
