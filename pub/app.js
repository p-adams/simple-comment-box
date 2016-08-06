var socket = io();

vm = new Vue({
    el: "#app",
    data: {
        text: '',
        messages: [],
        likes: 0,
        cliked: false
    },
    methods: {
        send(){
            if(!this.text)return
            socket.emit('send', this.text)
            this.text=''    
        },
        upvote(){
            this.clicked = !this.clicked
            socket.emit('like', this.likes)
        },
        downvote(){
            this.clicked = !this.clicked
            socket.emit('dislike', this.likes)
        }
    },
    mounted(){
       
        var self = this
        socket.on('send', function(msg){
            self.messages.push(msg) 
        })
        socket.on('like', function(like){
            self.likes = like
        })
        socket.on('dislike', function(like){
            self.likes = like
        })

    }
})