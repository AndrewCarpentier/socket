import styles from "./Message.module.scss";
import { useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import { socket } from "../../socket";
import { MyForm } from "../../components/MyForm/MyForm";
import { ShowMessage } from "./ShowMessage/ShowMessage";

export function Message() {
  const { user } = useContext(AuthContext);

  if (user) {
    socket.connect();
  }

  return (
    <div className={`${styles.container}`}>
      <div>
        <ShowMessage />
        <div>bottompage</div>
        <div className={`d-flex ${styles.form}`}>
          <MyForm />
        </div>
      </div>
    </div>
  );
}
