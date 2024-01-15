import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import ReactScrollToBottom from "react-scroll-to-bottom"
import socketIO from "socket.io-client";
import Message from "../message/Message";
const ENDPOINT = `https://backendchatapp-weu3.onrender.com/`;

let socket;
const Chat = () => {
  const [id, setid] = useState("");
  const [messages,setmessgaes]=useState([]);
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit('message', { message, id });
    document.getElementById("chatInput").value = "";
  };

 


  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      // alert("connected")
      setid(socket.id);
    });
   
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setmessgaes([...messages,data]);
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setmessgaes([...messages,data]);
      console.log(data.user, data.message);
    });
    socket.on('leave', (data) => {
      setmessgaes([...messages,data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit('disconnection');
      socket.off();
    }
   
  },[]);
  useEffect(()=>{
    socket.on("sendMessage",(data)=>{
      setmessgaes([...messages,data]);
        console.log(data.user,data.message,data.id)
    })
    return ()=>{
      socket.off()
    }
  },[messages])
  return (
    <div className="bg-slate-400 w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="bg-white h-[60%] w-[80%]">
        <div className="bg-red-300 h-[15%] border"></div>
        <ReactScrollToBottom className="h-[80%] ">
         {
          messages.map((message,index)=>(
            <Message message={message.message} user={message.id===id ? "" : message.user} classs={message.id===id ? "right" : "left"} key={index} />
          ))
         }
        </ReactScrollToBottom>
        <div className="h-[15%]  flex">
          <input
          onKeyPress={(event)=>event.key==="Enter" ?send():null}
            type="text"
            id="chatInput"
            className="w-[80%] text-xl border-none bg-white p-[1vmax] "

          />
          <button
            onClick={send}
            className="bg-red-300 text-white w-[20%] border-none hover:bg-red-600 hover:cursor-pointer lg:text-xl "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
