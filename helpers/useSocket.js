import { useEffect, useState } from "react";

export default function useSocket(socket) {
  const [msgs, setMsgs] = useState([]);
  socket.on("msg", msg => setMsgs([...msgs, msg]));
  console.log(socket);
  useEffect(() => socket.disconnect);

  const sendMsg = msg => socket.emit("msg", msg);

  return { msgs, sendMsg };
}
