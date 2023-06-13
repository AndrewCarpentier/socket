import styles from "./ShowUser.module.scss";
import { useContext, useEffect, useState } from "react";
import { getUserByChannelId } from "../../api/User";
import { socket } from "../../socket";
import { AuthContext } from "../../context/AuthContext";
import { getPrivateChannel } from "../../api/Channel";

export function ShowUser({ channel, chooseChannel }) {
  const { user, getCurrent } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (channel.privateMessage) {
        setUsers(await getUserByChannelId(channel.id, true));
      } else {
        setUsers(await getUserByChannelId(channel.id, false));
      }
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

  async function privateMessage(userSend) {
    try {
      chooseChannel(await getPrivateChannel(user.id, userSend.id));
      socket.emit('resetChannel', "");
      getCurrent();
    } catch (error) {}
  }

  return (
    <div className={`${styles.container}`}>
      <ul>
        {users.map((u) => (
          <li
            key={u.id}
            className="d-flex"
            onClick={u.id === user.id ? () => {} : () => privateMessage(u)}
          >
            <div
              className={`d-flex justify-content-center align-item-center mr10`}
            >
              <span
                className={`dot ${u.connected ? "bgColorGreen" : "bgColorRed"}`}
              ></span>
            </div>
            {u.pseudo}
          </li>
        ))}
      </ul>
    </div>
  );
}
