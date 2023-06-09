import styles from './ShowChannel.module.scss';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getChannelsByIdUser } from "../../api/Channel";

export function ShowChannel({chooseChannel}) {
  const { user } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      setChannels(await getChannelsByIdUser(user.id));
    };
    fetchChannels();
  }, [user]);

  return (
    <div className={`${styles.container}`}>
      <h2>Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} onClick={()=> chooseChannel(channel)} >{channel.name}</li>
        ))}
      </ul>
    </div>
  );
}
