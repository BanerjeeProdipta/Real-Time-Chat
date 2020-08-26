require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.component('message', require('./components/message.vue').default);


const app = new Vue({
    el: '#app',

    data: {
        message:'',
        chat:{
            message:[],
            user:[]
        },
        typing: ""
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
        gettime(){
            let time = new Date();
            return time.getHours()+':'+time.getMinutes;
        }
    },

    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                console.log(e);
        })
            .listenForWhisper('typing', (e) => {
                if(e.name != ''){
                    this.typing="typing..."
                    // console.log('typing');
                }
                else{
                    this.typing=""
                    // console.log('')
                }
                
        })
    }
});
