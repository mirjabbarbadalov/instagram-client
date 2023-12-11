export const Message = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 select-none">
      <div className="w-[150px]">
        <img src="../../../public/images/messages.png" alt="" />
      </div>
      <p>Your messages</p>
      <p className="text-zinc-400">
        Create new chats and send private messages to a friend
      </p>
      <button
        type="button"
        className="bg-[#4193ef] hover:bg-blue-600 text-white px-4 py-1 rounded-lg mt-1"
      >
        Send message
      </button>
    </div>
  );
};
