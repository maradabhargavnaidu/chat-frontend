import soceketIOClient from "socket.io-client";
import { Socket } from "socket.io-client";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
const socket = soceketIOClient.connect("http://localhost:3001");

function App() {
  const nameRef = useRef();
  const roomRef = useRef();
  const messageRef = useRef();
  const [recdata, setRecdata] = useState([]);

  function join() {
    socket.emit("join_room", roomRef.current.value);
  }
  const sendmessage = () => {
    socket.emit("send_message", {
      roomid: roomRef.current.value,
      username: nameRef.current.value,
      message: messageRef.current.value,
    });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setRecdata((recdata) => [...recdata, data]);
    });
  }, []);
  return (
    <div className="App">
      {/* <input type="text" placeholder="Username" ref={nameRef} /> */}
      <input type="text" placeholder="Enter Room Number" ref={roomRef} />
      <button onClick={() => join()}>Join</button>
      <input type="text" placeholder="Enter Name" ref={nameRef} />
      <input type="text" placeholder="Enter Message" ref={messageRef} />
      <button onClick={() => sendmessage()}>send</button>
      <h1>Messages</h1>
      {recdata.map((data, index) => {
        return (
          <div>
            <h1>{data.username}</h1>
            <p>{data.message}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
