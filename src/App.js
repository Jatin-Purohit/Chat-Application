import {React } from "react";
import {Route,Routes} from "react-router-dom"
import "./App.css";

import Join from "./component/Join/Join";
import Chat from "./component/chat/Chat";


const App = () => {
  

  return (
    <div className="">
    <Routes>
      <Route path="/" element={<Join />}/>
      <Route path="/chat" element={<Chat />}/>
    </Routes>
    </div>
  );
};

export default App;
