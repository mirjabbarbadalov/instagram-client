import React from "react";

interface MessengerProps {
  sender: string;
  content: string;
}

const Messenger: React.FC<MessengerProps> = ({ sender, content }) => (
  <div
    className={`message ${
      sender === "user" ? "user-message" : "other-message"
    }`}
  >
    <strong>{sender}</strong>: {content}
  </div>
);

export default Messenger;
