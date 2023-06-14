import styles from "./ShowChannelList.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getChannels, joinChannel } from "../../api/Channel";
import { socket } from "../../socket";

export function ShowChannelList() {
  const { user } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const channelsGet = await getChannels();
      user.channelList.forEach((e) => {
        channelsGet.forEach((c) => {
          if (c.alreadyJoin !== true) {
            c.alreadyJoin = e.id === c.id;
          }
          return c;
        });
      });
      console.log(channelsGet);
      setChannels(channelsGet);
    };
    fetchChannels();
  }, [user]);

  function onJoinChannel(idChannel) {
    if (joinChannel(user.id, idChannel)) {
      console.log("success");
      socket.emit("resetChannel", "");
    }
  }

  return (
    <div className={styles.container}>
      <ul>
        {channels.map((c) => (
          <li key={c.id}>
            <span>{c.name}</span>
            {!c.alreadyJoin && (
              <button
                className="btn btn-primary ml10"
                onClick={() => onJoinChannel(c.id)}
              >
                Rejoindre
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
