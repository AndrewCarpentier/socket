import styles from "./ShowMessage.module.scss";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { getMessageByIdChannel } from "../../api/Message";
import * as moment from "moment";

moment.locale("fr");
export function ShowMessage({channel}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      const messages = await getMessageByIdChannel(channel.id);
      messages.map((message) => onMessage(message));
    };
    fetchMessage();

    function onMessage(values) {
      const date = moment(values.creationDate).fromNow();
      setMessages((prev) => [
        ...prev,
        {
          pseudo: values.user.pseudo,
          message: values.message,
          gif : Boolean(values.gif),
          date: date.toString(),
        },
      ]);
    }

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [setMessages, channel]);

  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i} id={i+1} className={`${styles.message}`}>
          <div>
            <span className={`${styles.pseudo}`}>{message.pseudo}</span>
            <span className={`${styles.date} ml10`}>{message.date}</span>
          </div>
          {message.gif ? (<img className={styles.gif} src={message.message} alt="gif"/>) : (<div className={`${styles.text}`}>{message.message}</div>)}
        </li>
      ))}
    </ul>
  );
}
