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
            message:[]
        }
    },
    methods: {
        send(){
            if(this.message.length != 0){

                this.chat.message.push(this.message);
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
        }
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.message.push(e.message);
                console.log(e);
    });
    }
});
