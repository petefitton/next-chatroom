import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
//   extraHeaders: {
//     "Access-Control-Allow-Origin": "http://127.0.0.1:5000"
//   }
});

export default socket;