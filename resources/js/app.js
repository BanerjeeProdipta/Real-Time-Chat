require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'

// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 8000})

Vue.component('message', require('./components/message.vue').default);


const app = new Vue({
    el: '#app',

    data: {
        message:'',
        chat:{
            message:[],
            user:[],
            time:[]
        },
        typing: "",
        numberOfUser:0
    },

    watch: {
        message(){
            Echo.private('chat')
            .whisper('typing', {
                name: this.message
            });
        }
    },

    methods: {
        send(){
            if(this.message.length != 0){

                this.chat.message.push(this.message);
                this.chat.user.push('me');
                this.chat.time.push(this.getTime());
                // this.message = '';
                console.log(this.message)
                
                axios.post('/send', {
                    message : this.message
                  })
                  .then(response => {
                    console.log(response);
                    this.message = '';
                  })
                  .catch(error => {
                    console.log(error);
                  });
            }
        },
        getTime(){
            let time = new Date();
            return time.getHours()+':'+time.getMinutes();
        }
    },

    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.time.push(this.getTime());
                console.log(e);
        })
            .listenForWhisper('typing', (e) => {
                if(e.name != ''){
                    this.typing="Typing..."
                    // console.log('typing');
                }
                else{
                    this.typing=""
                    // console.log('')
                }
                
        });
    Echo.join('chat')
        .here((user) =>{
            this.numberOfUser = user.length;
            // console.log(users);
        })
        .joining((user) =>{
            this.numberOfUser +=1;
            this.$toaster.success(user.name+' joined the chat room')
            console.log(user.name);
        })
        .leaving((user) =>{
            this.numberOfUser -=1;
            this.$toaster.error(user.name+' left the chat room')
            console.log(user.name);
        })
        .listen('NewMessage', (e) => {
        //
    });

    }
});
