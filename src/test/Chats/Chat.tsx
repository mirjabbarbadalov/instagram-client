import { Directs } from "./Directs";
import { ChatButton } from "./ChatButton";

export const Chat = () => {
  return (
    <div className="flex gap-16">
      <div className="border-r">
        <Directs />
      </div>
      <div>
        <ChatButton />
      </div>
    </div>
  );
};
