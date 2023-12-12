import { Directs } from "./Directs";
import { ChatButton } from "./ChatButton";

export const Chat = () => {
  return (
    <div className="flex gap-16 justify-center">
      <div className="border-r p-8 mt-8">
        <Directs />
      </div>
      <div className="self-center">
        <ChatButton />
      </div>
    </div>
  );
};
