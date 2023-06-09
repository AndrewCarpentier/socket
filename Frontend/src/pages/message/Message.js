import styles from "./Message.module.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { socket } from "../../socket";
import { MyForm } from "../../components/MyForm/MyForm";
import { ShowMessage } from "../../components/ShowMessage/ShowMessage";
import { ShowChannel } from "../../components/ShowChannel/ShowChannel";

export function Message() {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null)

  if (user) {
    socket.connect();
  }

  return (
    <div className={`${styles.container} d-flex`}>
      <div className={styles.ShowChannel}>
        <ShowChannel chooseChannel={setChannel}  />
      </div>
      <div className={`${styles.message}`}>
        <div>
          {
            channel && (<ShowMessage channel={channel}/>)
          }
        </div>
        <div className={`d-flex ${styles.form}`}>
          <MyForm />
        </div>
      </div>
    </div>
  );
}
