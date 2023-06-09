import styles from "./Message.module.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { socket, addIdToSocket } from "../../socket";
import { MyForm } from "../../components/MyForm/MyForm";
import { ShowMessage } from "../../components/ShowMessage/ShowMessage";
import { ShowChannel } from "../../components/ShowChannel/ShowChannel";
import { ShowUser } from "../../components/ShowUser/ShowUser";

export function Message() {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);

  if (user) {
    addIdToSocket(user.id)
    socket.connect();

    socket.emit('newConnection', "");
  }

  return (
    <div className={`${styles.container} d-flex`}>
      <div className={styles.ShowChannel}>
        <ShowChannel chooseChannel={setChannel} />
      </div>
      <div className={styles.message}>
        {channel && <ShowMessage channel={channel} />}
      </div>
      <div>{channel && <ShowUser channel={channel} />}</div>
      <div className={`d-flex ${styles.form}`}>
        <MyForm />
      </div>
    </div>
  );
}
