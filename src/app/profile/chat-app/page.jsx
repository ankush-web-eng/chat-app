"use client";
import ProfileNav from "@/components/navbar";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { LuSendHorizonal } from "react-icons/lu";

export default function UserProfilePage() {
  const [message, setMessage] = useState("");
  let [socket, setSocket] = useState(null);
  const [inbox, setInbox] = useState([]);
  const [username, setUsername] = useState("");
  const [person, setPerson] = useState("");
  const [dataInbox, setDataInbox] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUsername(res.data.data.username);
      setPerson(res.data.data.username);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const changeColors = function () {
    const hex = "0123456789ABCDEF";
    var cl = "#";
    for (let i = 0; i < 6; i++) {
      cl += hex[Math.floor(Math.random() * 16)];
    }
    return cl;
    // console.log(cl)
  };

  // <====>

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    fetchCurrentUser();
    getMessages();
    newSocket.on("chat", (data) => {
      if (data && data.message && data.username) {
        setInbox((prev) => [
          ...prev,
          { message: data.message, username: data.username },
        ]);
      }
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  //<====>

  const data = { person: person, message: message };

  const sendMessage = async () => {
    if (socket) {
      socket.emit("chat", { message, username });
      setMessage("");
    }
    try {
      const resp = await axios.post("/api/users/message", data);
      console.log("Sent successfuly", data);
    } catch (error) {
      console.log(error);
    }
  };

  async function getMessages() {
    try {
      const respon = await axios.get("/api/users/getmessage");
      setDataInbox(respon.data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col space-y-2">
        <ProfileNav className="" />
        <div className="flex flex-wrap w-screen mt-8 flex-col h-5/6">
          <div className="flex flex-col w-screen h-full">
            <div className=" h-5/6 rounded-md border-2 w-screen border-black snap-end dark:border-white flex flex-col justify-center items-start px-2 ">
              <div className="pb-4 w-screen h-5/6 overflow-hidden overflow-y-scroll">
                {dataInbox == null
                  ? ""
                  : dataInbox.map((data, index) => (
                      <div className="flex flex-row justify-start" key={index}>
                        <strong className="italic" style={{color:changeColors()}}>
                          {data.name == person ? "You" : data.name} :{" "}
                        </strong>{" "}
                        {data.message}{" "}
                      </div>
                    ))}
                {inbox.map((chat, index) => (
                  <div className="flex flex-row justify-start" key={index}>
                    <p>{chat.username == person ? "You" : chat.username} : </p>{" "}
                    {chat.message}{" "}
                  </div>
                ))}
              </div>
            </div>
            <div className="bottom-12 flex-row flex mt-3">
              <input
                className="rounded-full w-screen border-2 border-black dark:border-white pl-3 ml-2 text-black"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 rounded-full text-white hover:bg-black right-0 mr-1 hover:text-white px-2 py-1"
              >
                <LuSendHorizonal />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// async function connectSocket() {
//   await axios.get("/api/users/socket");
//   socket = io();

//   socket.on("chat", (data) => {
//     if (data && data.message && data.username) {
//       setInbox((prevInbox) => [
//         ...prevInbox,
//         { message: data.message, username: data.username },
//       ]);
//     }
//   });

//   setSocket(socket);

//   return () => {
//     if (socket) {
//       socket.disconnect();
//     }
//   };
// }

// useEffect(() => {
//   fetchCurrentUser();
//   connectSocket();
//   getMessages();

//   return () => {
//     if (socket) {
//       socket.disconnect();
//     }
//   };
// }, []);

// async function onDelete() {
//   const response = axios.delete("/api/users/delete-message", data);
//   if (response) {
//     alert("Backend me request ja rahi hai!!");
//   }
// }
