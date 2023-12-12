import { Action } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import io, { Socket } from "socket.io-client";
import { fetchProfileDetails } from "../../store/slices/profileSlice";
import { RootState } from "../../store/store";
import { State } from "../../types/types";
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

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  useEffect(() => {
    let socketInstance: Socket | null = null;

    const setupSocket = () => {
      socketInstance = io("https://instagram-api-88fv.onrender.com/", {
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
      <div className="flex flex-col h-screen w-[800px] ml-10">
        <h1 className="text-3xl font-bold mb-4 mt-8">Chat with {chatter}</h1>
        <div className="flex-1 overflow-y-auto bg-slate-100 p-4 rounded-lg rounded-b-none ">
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
                    <div
                      className={`rounded-full bg-${
                        isSentMessage ? "blue-500" : "gray-300"
                      } w-[20px] h-[20px] ml-2 mr-2`}
                    ></div>
                  )}
                  <div
                    className={`py-3 px-6 rounded-3xl ${
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
        <form className="flex items-center mb-4">
          <textarea
            aria-label="Socket"
            className="w-full p-4 bg-slate-100 border-t-4 border-blue-200 rounded-lg rounded-t-none rounded-r-none resize-none"
            rows={1}
            placeholder="Send message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-500 text-white p-4 border-blue-200 border-t-4  rounded-lg rounded-t-none rounded-l-none hover:bg-blue-600"
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
