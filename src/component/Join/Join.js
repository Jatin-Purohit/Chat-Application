import React, { useState } from 'react'
import logo from "../../images/logo.png"
import { Link } from 'react-router-dom'

let user;
const senduser=()=>{
  user=document.getElementById("inputbtn").value;
  document.getElementById("inputbtn").value=""

}
const Join = () => {


  const [name, setname] = useState("");
  console.log(name)
  return (


    <div className='bg-black w-[100vw] h-[100vh] flex justify-center items-center'>
      <div className='w-[50%] flex flex-col items-center'>
        <img src={logo} alt='logo' className='w-[10vmax]' />
        <h1 className='text-white text-[2.5vmax] font border-b-2 w-[25vmax] text-center'>Abhiiiii-Chat</h1>
        <input 
        type='text'
        className='w-[25vmax] border-none outline-none font-[1.5rem] p-[1.5vmax] m-[2vmax] box-border'
        placeholder='Enter Your Name'
        id='inputbtn'
        onChange={(e)=>setname(e.target.value)}
        />
        <Link onClick={(e)=>!name ? e.preventDefault() : null} to={"/chat"}><button onClick={senduser} className='text-white w-[25vmax] border-none outline-none font-[1.5rem] p-[1.5vmax] m-[2vmax] bg-red-600 hover:bg-red-400 hover:cursor-pointer'>LogIn</button>
        </Link>
      </div>
    </div>
  )
}

export default Join
export  {user}