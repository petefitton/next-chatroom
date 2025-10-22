'use client'

// import { SocketContext } from "@/app/contexts/SocketContext";
import socket from "@/app/lib/socket";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { useEffect, useContext } from "react";
import io from "socket.io-client";

// let socket;
export default function Room() {
  // const socket = useContext(SocketContext);
  // useEffect(() => {
  //   console.log("starting component")
    // socket.connect();
  //   socket.on("user_connected", message => {
  //     console.log(message);
  //     console.log(message.msg);
  //   });

  //   function createEvent() {
  //     socket.emit("my event", {"message": {"data": "my data"}});
  //   }
  //   const interval = setInterval(createEvent, 500);


  //   return () => {
  //     console.log("destroying component")
  //     socket.disconnect();
  //     socket.off("user_connected", message => {
  //       console.log(message);
  //       console.log(message.msg);
  //     });
  //     clearInterval(interval);
  //   }
  // }, []);

  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    console.log("initializing component");
    // socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    // socket.connect();
    console.log("tried to connect");
    if (socket.connected) {
      console.log("socket should be connected");
      onConnect();
    } else {
      socket.connect();
    }

    // function createEvent() {
    //   // console.log(socket.connected);
    //   socket.emit("my event", {"data": "my data"});
    // }
    // const interval = setInterval(createEvent, 1000);

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    function logResponse(message: {data: ""}) {
      console.log(message)
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("my response", msg => logResponse(msg));

    console.log(socket);

    return () => {
      console.log("tearing down component")
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // clearInterval(interval);
    };
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Link href="/chat">Return to chatrooms</Link>
        Here is the chatroom you selected
        {/* show existing messages */}
        {/* add form for submitting new messages */}
        <p>Status: { isConnected ? "connected" : "disconnected" }</p>
        <p>Transport: { transport }</p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
