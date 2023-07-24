import "./message.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";
import Footer from "../Footer";

const socket = io.connect("http://localhost:3001");

function Message() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
      if (response.data.success) {
        setUsername(response.data.data.username);
      }
    } catch (err) {
      alert(err);
    }
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
    <div className="chatting">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
    <Footer />
    </>
  );
}

export default Message;
