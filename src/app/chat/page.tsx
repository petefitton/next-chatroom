import { getRoomIds } from "@/app/lib/data";
import ChatroomItem from "../ui/chat/ChatroomItem";

export default function Chat() {
  const rooms = getRoomIds();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        Choose a chatroom below:
        {rooms && rooms.map(room => {
          return <ChatroomItem key={room.id} roomId={room.id} name={room.name} />
        })}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
