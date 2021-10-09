import { createContext } from 'react';
import socketio from "socket.io-client";
import { SOCKET_URL } from "../config/constants";

export const socket = socketio.connect(SOCKET_URL);
const SocketContext = createContext({ socket: socket });

export { SocketContext };
