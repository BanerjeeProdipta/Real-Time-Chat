<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('css/app.css')}} ">
    <style>
        .list-group{
            overflow-y: scroll;
            height:calc(100vh - 100px);
        }
    </style>
    <title>Messenger</title>
</head>
<body>
    <div class="container">
        <div class="flex"></div>
        <div class="flex border border-gray-300 rounded-lg" id="app">
            <li class="list-group-item active">Private Chat</li>
            <div class=" d-flex">@{{ typing }}</div>
            <ul class="list-group" v-chat-scroll>
               <message 
               v-for = "value,index in chat.message"
               :key = value.index
               color = info
               :user = chat.user[index]
               >
                   @{{value}}
               </message>
              </ul>
            <input type="text" class="form-control" placeholder="Typle a message..." v-model='message' @keyup.enter='send' autofocus>
        </div>
        <div class="flex"></div>
    </div>
    <script src="{{ asset('/js/app.js') }}"></script>
</body>
</html>