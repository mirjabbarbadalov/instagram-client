import { Action } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import io, { Socket } from "socket.io-client";
import { fetchProfileDetails } from "../../../store/slices/profileSlice";
import { RootState } from "../../../store/store";
import { State } from "../../../types/types";
import { Alert, CircularProgress } from "@mui/material";

const Message: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [connectedUserId, setConnectedUserId] = useState<string | null>(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId || null;
  });
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: string; message: string }>
  >([]);

  const dispatch = useDispatch<ThunkDispatch<State, void, Action>>();
  const { user, status, error } = useSelector(
    (state: RootState) => state.profile
  );

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
        console.log(user._id, " user.id");
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
    if (socket && recipient && message) {
      if (socket.connected) {
        socket.emit("private_message", {
          to: recipient,
          message,
        });

        setChatMessages((prevMessages) => [
          ...prevMessages,
          { sender: "You", message: `to ${recipient}: ${message}` },
        ]);

        setMessage("");
      } else {
        console.error("Socket is not connected.");
      }
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center ml-[50px] mb-[100px]">
        <CircularProgress size={70} />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center">
        <Alert severity="error">Error: {error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h1 className="text-2xl font-bold mb-4">Direct Messages</h1>
        <div>
          <p className="flex items-center justify-center mb-5">
            Your chat history:
          </p>
          <div className="bg-white p-4 rounded-lg shadow-md">
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
                      className={`p-3 rounded-lg ${
                        isSentMessage
                          ? "bg-blue-500 text-white ml-2"
                          : "bg-gray-300 text-black mr-2"
                      }`}
                    >
                      <div>{`Message ${content}`}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Message:</label>
          <textarea
            aria-label="Socket"
            className="w-full px-3 py-2 border rounded resize-none"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Recipient Socket ID:
          </label>
          <input
            aria-label="Socket"
            className="w-full px-3 py-2 border rounded"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        {connectedUserId ? (
          <p className="text-xl font-bold mb-2">
            Your User ID: {connectedUserId}
          </p>
        ) : (
          <p className="text-xl font-bold mb-2">Connecting to the server...</p>
        )}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
          onClick={handleSendMessage}
          disabled={!socket}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Message;
