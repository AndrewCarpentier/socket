import styles from "./ShowUser.module.scss";
import { useEffect, useRef, useState } from "react";
import { getUserByChannelId } from "../../api/User";
import { socket } from "../../socket";

export function ShowUser({ channel }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers(await getUserByChannelId(channel.id));
    };
    fetchUsers();

    function onNewConnection() {
      fetchUsers();
    }

    function onDisconnect() {
      fetchUsers();
    }

    socket.on("newConnection", onNewConnection);
    socket.on("disconnection", onDisconnect);

    return () => {
      socket.off("newConnection", onNewConnection);
      socket.off("disconnection", onDisconnect);
    };
  }, [channel]);

  return (
    <div className={`${styles.container}`}>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="d-flex">
            <div
              className={`d-flex justify-content-center align-item-center mr10`}
            >
              <span
                className={`dot ${
                  user.connected ? "bgColorGreen" : "bgColorRed"
                }`}
              ></span>
            </div>
            {user.pseudo}
          </li>
        ))}
      </ul>
    </div>
  );
}
