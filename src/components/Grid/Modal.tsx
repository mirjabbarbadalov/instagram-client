import React from "react";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 flex justify-center items-center p-0">
      <div
        className="absolute inset-0 bg-gray-600 opacity-40 "
        onClick={onClose}
      ></div>
      <div className="relative z-10 text-white flex items-center justify-center">
        Modal
      </div>
    </div>
  );
};

export default Modal;
