import styles from "./ShowMessage.module.scss";
import { useContext, useEffect, useState } from "react";
import { socket } from "../../socket";
import { getMessageByIdChannel } from "../../api/Message";
import * as moment from "moment";
import { AuthContext } from "../../context/AuthContext";

moment.locale("fr");
export function ShowMessage({ channel, reset, setReset }) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  console.log(channel)
  useEffect(() => {
    const fetchMessage = async () => {
      setMessages([])
      let messages;
      if (channel.privateMessage) {
        messages = await getMessageByIdChannel(channel.id, true);
      } else {
        messages = await getMessageByIdChannel(channel.id, false);
      }
      messages.map(async (message) => {
        setMessages((prev) => [
          ...prev,
          {
            pseudo: message.user.pseudo,
            message: message.message,
            gif: Boolean(message.gif),
            date: moment(message.creationDate).fromNow().toString(),
          },
        ]);
      });
    };
    fetchMessage();

    function onMessage(values) {
      const date = moment(values.creationDate).fromNow();
      setMessages((prev) => [
        ...prev,
        {
          pseudo: values.user.pseudo,
          message: values.message,
          gif: Boolean(values.gif),
          date: date.toString(),
        },
      ]);
    }
    if (reset) {
      user.channelList.forEach((e) => {
        socket.on(e.id + "message", onMessage);
      });

      user.privateChannelList.forEach((e) => {
        socket.on(e.id + "privateMessage", onMessage);
      });

      return () => {
        user.channelList.forEach((e) => {
          socket.off(e.id + "message", onMessage);
        });

        user.privateChannelList.forEach((e) => {
          socket.off(e.id + "privateMessage", onMessage);
        });
      };
      setReset(false);
    }

    user.channelList.forEach((e) => {
      socket.on(e.id + "message", onMessage);
    });

    user.privateChannelList.forEach((e) => {
      socket.on(e.id + "privateMessage", onMessage);
    });

    return () => {
      user.channelList.forEach((e) => {
        socket.off(e.id + "message", onMessage);
      });

      user.privateChannelList.forEach((e) => {
        socket.off(e.id + "privateMessage", onMessage);
      });
    };

  }, [setMessages, channel, user, setReset, reset]);

  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i} id={i + 1} className={`${styles.message}`}>
          <div>
            <span className={`${styles.pseudo}`}>{message.pseudo}</span>
            <span className={`${styles.date} ml10`}>{message.date}</span>
          </div>
          {message.gif ? (
            <img className={styles.gif} src={message.message} alt="gif" />
          ) : (
            <div className={`${styles.text}`}>{message.message}</div>
          )}
        </li>
      ))}
    </ul>
  );
}
