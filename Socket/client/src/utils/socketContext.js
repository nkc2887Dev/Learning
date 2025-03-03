import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // Backend URL
    setSocket(newSocket);

    newSocket.on("liveScore", (data) => {
      setScore(data); // Update score when received
    });

    return () => newSocket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ score }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
