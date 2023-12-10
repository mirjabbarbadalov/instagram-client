import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

const Message: React.FC = () => {
  const storedUserId = localStorage.getItem("userId");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [connectedUserId, setConnectedUserId] = useState<string | null>(
    storedUserId
  );

  useEffect(() => {
    const socketInstance = io("https://instagram-api-88fv.onrender.com/", {
      query: { userId: storedUserId },
    });

    socketInstance.on("connect", () => {
      const currentUserId = socketInstance.id;
      console.log(`Connected to the server with socket ID: ${currentUserId}`);
      localStorage.setItem("userId", currentUserId);
      setSocket(socketInstance);
      setConnectedUserId(currentUserId);
    });

    socketInstance.on(
      "private_message",
      (data: { from: string; message: string }) => {
        setReceivedMessages((prevMessages) => [
          ...prevMessages,
          `${data.from}: ${data.message}`,
        ]);
      }
    );

    socketInstance.on("disconnect", () => {
      console.log(`User disconnected`);
      setSocket(null);
      setConnectedUserId(null);
    });

    return () => {
      if (socketInstance.connected) {
        socketInstance.disconnect();
      }
    };
  }, [storedUserId]);

  const handleSendMessage = () => {
    if (socket && recipient && message) {
      if (socket.connected) {
        socket.emit("private_message", {
          to: recipient,
          message,
        });

        setSentMessages((prevMessages) => [
          ...prevMessages,
          `You to ${recipient}: ${message}`,
        ]);

        setMessage("");
      } else {
        console.error("Socket is not connected.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h1 className="text-2xl font-bold mb-4">Direct Messages</h1>
        <div>
          <p className="flex items-center justify-center mb-5">
            Your chat history:
          </p>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ul className="list-disc pl-4">
              {receivedMessages.map((msg, index) => (
                <li key={index} className="mb-2">
                  {msg}
                </li>
              ))}
              {sentMessages.map((msg, index) => (
                <li key={index} className="mb-2">
                  {msg}
                </li>
              ))}
            </ul>
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
            Connected User ID: {connectedUserId}
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
