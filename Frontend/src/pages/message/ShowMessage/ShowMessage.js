import styles from "./ShowMessage.module.scss";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { getMessages } from "../../../api/Message";
import * as moment from "moment";

moment.locale("fr");
export function ShowMessage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessage = async () => {
      const messages = await getMessages();
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
          date: date.toString(),
        },
      ]);
    }

    socket.on("message", onMessage);

    return () => {
      socket.off("message", onMessage);
    };
  }, [setMessages]);

  return (
    <ul>
      {messages.map((message, i) => (
        <li key={i} id={i+1} className={`${styles.message}`}>
          <div>
            <span className={`${styles.pseudo}`}>{message.pseudo}</span>
            <span className={`${styles.date} ml10`}>{message.date}</span>
          </div>
          <div className={`${styles.text}`}>{message.message}</div>
        </li>
      ))}
    </ul>
  );
}
