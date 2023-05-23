import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { ConnectionState } from "./components/ConnectionState";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm/MyForm";
import { ConnectionManager } from "./components/ConnectionManager";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvents(value) {
      console.log(value);
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onFooEvents);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onFooEvents);
    };
  });

  return (
    <div>
      <AuthProvider>
        <Outlet />
        <ConnectionState isConnected={isConnected} />
        <Events events={fooEvents} />
        <div className={`d-flex ${styles.form}`}>
          <ConnectionManager isConnected={isConnected} />
          {isConnected ? <MyForm isConnected={isConnected} /> : ""}
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
