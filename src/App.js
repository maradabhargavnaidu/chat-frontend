import soceketIOClient from "socket.io-client";
import { Socket } from "socket.io-client";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import "./App.css";
// const socket = soceketIOClient.connect("http://localhost:3001");
const socket = soceketIOClient.connect(
  "https://chat-backend-rkyg.onrender.com/"
);

function App() {
  const nameRef = useRef();
  const roomRef = useRef();
  const messageRef = useRef();
  // const [recdata, setRecdata] = useState([]);
  // const [sendata, setSendata] = useState([]);
  const [totdata, setTotdata] = useState([]);

  function join() {
    socket.emit("join_room", roomRef.current.value);
  }
  const sendmessage = () => {
    setTotdata((sendata) => [
      ...sendata,
      {
        username: nameRef.current.value,
        message: messageRef.current.value,
      },
    ]);
    socket.emit("send_message", {
      roomid: roomRef.current.value,
      username: nameRef.current.value,
      message: messageRef.current.value,
    });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setTotdata((recdata) => [...recdata, data]);
    });
  }, []);
  return (
    <div className="bg-black">
      <div className="min-h-screen flex flex-col container mx-auto gap-3 max-w-96 p-4">
        {/* <input type="text" placeholder="Username" ref={nameRef} /> */}
        <input
          type="text"
          placeholder="Enter Name"
          ref={nameRef}
          className="h-12 border-2 border-black"
        />
        <input
          type="text"
          placeholder="Enter Room Number"
          ref={roomRef}
          className="h-12 border-2 border-black"
        />
        <button onClick={() => join()} className="bg-green-600 p-3">
          Join
        </button>

        <input
          type="text"
          placeholder="Enter Message"
          ref={messageRef}
          className="h-12"
        />
        <button onClick={() => sendmessage()} className="bg-green-600 p-3">
          send
        </button>
        <h1 className="text-white text-5xl font-bold text-center">Messages</h1>
        {totdata.map((data, index) => {
          return (
            <div>
              <p className="text-red-400 font-bold text-2xl">
                ${data.username}:-{" "}
                <span className="text-green-500">{data.message}</span>
              </p>
            </div>
          );
        })}
        {/* {sendata.map((data, index) => {
          return (
            <div>
              <p className="text-red-400 font-bold text-2xl">
                ${data.username}:-{" "}
                <span className="text-green-500">{data.message}</span>
              </p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}

export default App;
