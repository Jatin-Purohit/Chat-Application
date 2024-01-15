const express=require("express")
const http=require("http")
require("dotenv").config();
const SocketIO=require("socket.io")
const cors=require("cors")
const app=express();

const port=process.env.port || 8000;


const users=[{}]

const server=http.createServer(app);
const io=SocketIO(server)
app.use(cors());

server.listen(port,()=>{
    console.log(`APP at http://localhost:${port}`)
})

io.on("connection",(socket)=>{
 console.log("circuit on")

    socket.on("joined",({user})=>{
            console.log("User Joined ->",user)
            users[socket.id]=user;
            console.log(`${user} Joined The Chat`)
            socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} Has Joined`})
            socket.emit('welcome',{user:"Admin",message:`Welcome to the Chat,${users[socket.id]}`})
    })
    
    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
      console.log(`user left`);
  })
    
})
app.get("/",(req,res)=>{
    res.send("hell")
})