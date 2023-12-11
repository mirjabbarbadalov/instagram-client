import { Directs } from "./Directs";
import { Message } from "./Message";

export const Chat = () => {
  return (
    <div className="flex gap-16">
      <div className="border-r">
        <Directs />
      </div>
      <div>
        <Message />
      </div>
    </div>
  );
};
