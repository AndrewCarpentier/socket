import styles from "./ShowChannel.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getChannelsByIdUser,
  getPrivateChannel,
  getPrivateChannelsByIdUser,
} from "../../api/Channel";

export function ShowChannel({
  chooseChannel,
  onShowAddChannel,
  reset,
  setReset,
  onShowMessages,
  idChannelActive,
  setIdChannelActive,
}) {
  const { user } = useContext(AuthContext);
  const [channels, setChannels] = useState([]);
  const [privateChannels, setPrivateChannels] = useState([]);
  const [showPrivateChannel, setShowPrivateChannel] = useState(false);

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
    setIdChannelActive(channel.id);
  }

  async function onShowPrivateChannel() {
    setShowPrivateChannel(!showPrivateChannel);
    setPrivateChannels(await getPrivateChannelsByIdUser(user.id));
  }

  async function privateMessage(userId) {
    try {
      const channel = await getPrivateChannel(user.id, userId);
      chooseChannel(channel);
    } catch (error) {}
  }

  return (
    <div className={`${styles.container}`}>
      <div
        className={`d-flex justify-content-center align-item-center`}
        onClick={onShowPrivateChannel}
      >
        <i
          className={`fas fa-comments ${styles.privateMessage}  ${
            showPrivateChannel && styles.active
          } d-flex justify-content-center align-item-center`}
        />
      </div>
      {!showPrivateChannel ? (
        <ul>
          {channels.map((channel) => (
            <li key={channel.id} onClick={() => onChooseChannel(channel)}>
              <div
                className={`${styles.img} ${
                  idChannelActive === channel.id && styles.active
                }`}
              >
                <img src={channel.img} alt="img" />
              </div>
              <div>{channel.name}</div>
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
      ) : (
        <ul>
          {privateChannels.map((channel) => (
            <li
              key={channel.id}
              onClick={() =>
                privateMessage(
                  channel.user.id === user.id
                    ? channel.user2.id
                    : channel.user.id
                )
              }
            >
              <div className={styles.img}>
                <img
                  src={
                    channel.user.id === user.id
                      ? channel.user2.img
                      : channel.user.img
                  }
                  alt=""
                />
              </div>
              <span>
                {channel.user.id === user.id
                  ? channel.user2.pseudo
                  : channel.user.pseudo}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
