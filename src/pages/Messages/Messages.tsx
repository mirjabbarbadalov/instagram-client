import { Action } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import io, { Socket } from "socket.io-client";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { RootState } from "../../store/store";
import { State, User } from "../../types/types";
import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { Directs } from "./Directs";

const Messages: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const [message, setMessage] = useState("");

  const [connectedUserId, setConnectedUserId] = useState<string | null>(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId || null;
  });
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: string; message: string }>
  >([]);

  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { chatter } = useParams();

  const { user, status, error } = useSelector(
    (state: RootState) => state.profile
  );

  const follow: User[] = user.following;
  const chatterProfile = follow.find(
    (follower) => follower.username === chatter
  );

  console.log(follow);

  const profilePhoto = chatterProfile?.profilePhoto || "";

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  useEffect(() => {
    let socketInstance: Socket | null = null;

    const setupSocket = () => {
      socketInstance = io("http://localhost:9595", {
        query: { userId: user.username },
      });

      socketInstance.on("connect", () => {
        const currentUserName = user.username;
        console.log(
          `Connected to the server with socket ID: ${currentUserName}`
        );
        setSocket(socketInstance);
        setConnectedUserId(currentUserName as string);
      });

      socketInstance.on(
        "private_message",
        (data: { from: string; message: string }) => {
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { sender: data.from, message: data.message },
          ]);
        }
      );

      socketInstance.on("disconnect", () => {
        console.log(user.id, " user.id");
        console.log(`User disconnected`);
        setSocket(null);
        setConnectedUserId(null);
      });
    };

    setupSocket();

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [status, user]);

  const handleSendMessage = () => {
    if (socket && chatter && message) {
      if (socket.connected) {
        socket.emit("private_message", {
          to: chatter,
          message,
        });

        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: "You", message: `to ${chatter}: ${message}` },
        ]);

        setMessage("");
      } else {
        console.error("Socket is not connected.");
      }
    }
  };

  console.log(connectedUserId);

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center">
        <Alert severity="error">Error: {error}</Alert>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="border-r p-8 mt-8">
        <Directs />
      </div>
      <div className="flex flex-col h-screen w-[600px] ml-28">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold mb-4 mt-8 ml-2">
            Chat with {chatter}
          </h1>
          <div>
            <img
              src={`data:image/jpeg;base64,${profilePhoto}`}
              alt="Profile Photo"
              className="rounded-full w-[30px] h-[30px] object-cover mt-5"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-slate-100 p-5 rounded-2xl rounded-b-none ">
          <div className="space-y-2">
            {chatMessages.map((chatMessage, index) => {
              const isSentMessage = chatMessage.sender === "You";
              const content = isSentMessage
                ? chatMessage.message.replace(/^to \w+: /, "")
                : chatMessage.message;
              return (
                <div
                  key={index}
                  className={`flex items-center ${
                    isSentMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isSentMessage && (
                    <div>
                      <img
                        src={`data:image/jpeg;base64,${profilePhoto}`}
                        alt="Profile Photo"
                        className="rounded-full w-[30px] h-[30px] object-cover mr-3"
                      />
                    </div>
                  )}
                  <div
                    className={`py-2 px-5 rounded-3xl ${
                      isSentMessage
                        ? "bg-blue-500 text-white ml-2"
                        : "bg-gray-300 text-black mr-2"
                    }`}
                  >
                    <div>{`${content}`}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <form className="flex items-center mb-4 mt-3">
          <textarea
            aria-label="Socket"
            className="w-full p-4 bg-slate-100  border-blue-200 rounded-2xl rounded-t-none rounded-r-none resize-none outline-none"
            rows={1}
            placeholder="Send message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="bg-gradient-to-r from-blue-300 to-blue-500 text-white p-4  rounded-2xl rounded-t-none rounded-l-none focus:outline-none hover:from-blue-300 hover:to-green-500"
            onClick={handleSendMessage}
            disabled={!socket}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
