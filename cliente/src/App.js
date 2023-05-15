import "./App.css";
import io from "socket.io-client";

import { useState, useEffect } from "react";

const socket = io("http://localhost:4000");
function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMessage = {
      body: message,
      from: "ME",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  useEffect(() => {
    const recibeMessage = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on("message", recibeMessage);

    return () => {
      socket.off("message", recibeMessage);
    };
  }, [messages]);

  return (
    <div className="h-screen bg-zing-800 text-white flex items-center justify-center">
      <form onSubmit={submit} classNAme="bg-zinc-700 p-10 ">
        <h1 className="text-2xl  text-rose-950 font-bold my-2">Chat Interno &#128526;</h1>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="border-2 border-zinc-500 p-2  text-black w-full"
        />
        <ul className="h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <li key={index} className={`my-2 p-2 table text-sm rounded-md ${message.from === "ME" ? "bg-sky-900 ml-auto": "bg-black"}`}>
              <p>
                {message.from}: {message.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
