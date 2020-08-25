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

    // public function send(Request $request){
       
    //     event((new ChatEvent(auth()->user(),$message)));
    // }
    public function send(){
        $message ='hi';
        event((new ChatEvent($message, auth()->user())));
    }
}
