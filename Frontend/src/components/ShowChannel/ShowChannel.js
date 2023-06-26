import styles from "./ShowChannel.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getChannelsByIdUser } from "../../api/Channel";
import { getUserById } from "../../api/User";

export function ShowChannel({
  chooseChannel,
  onShowAddChannel,
  reset,
  setReset,
  onShowMessages,
}) {
  const { user } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);
  const [publicList, setPublicList] = useState(true);

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

  function onChooseChannel(channel) {
    chooseChannel(channel);
    onShowMessages(true);
  }

  function onPublicClick() {
    setPublicList(true);
  }

  function onPrivateClick() {
    setPublicList(false);
  }

  async function getUser(id) {
    const x = await getUserById(id);
    console.log(x);
    return await x.id.toString();
  }

  return (
    <div className={`${styles.container}`}>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} onClick={() => onChooseChannel(channel)}>
            {channel.name}
          </li>
        ))}
        <li
          className="d-flex justify-content-center"
          onClick={() => onShowAddChannel()}
        >
          <i className={`${styles.icon} fas fa-plus-circle`}></i>
        </li>
        <li
          className={`d-flex justify-content-center ${styles.compass}`}
          onClick={() => onShowMessages(false)}
        >
          <i className={`${styles.icon} fas fa-compass`}></i>
        </li>
      </ul>
    </div>
  );
}
