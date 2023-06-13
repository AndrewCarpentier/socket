import styles from "./ShowChannel.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getChannelsByIdUser } from "../../api/Channel";

export function ShowChannel({
  chooseChannel,
  onShowAddChannel,
  reset,
  setReset,
}) {
  const { user } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      setChannels(await getChannelsByIdUser(user.id));
    };
    fetchChannels();

    if (reset) {
      const fetchChannels = async () => {
        setChannels(await getChannelsByIdUser(user.id));
      };
      setReset(false);
      fetchChannels();
    }
  }, [user, reset, setReset]);

  return (
    <div className={`${styles.container}`}>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} onClick={() => chooseChannel(channel)}>
            {channel.name}
          </li>
        ))}
        <li
          className="d-flex justify-content-center"
          onClick={() => onShowAddChannel()}
        >
          <i className={`${styles.icon} fas fa-plus-circle`}></i>
        </li>
      </ul>
    </div>
  );
}
