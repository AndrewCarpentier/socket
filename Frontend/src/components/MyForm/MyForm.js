import styles from "./MyForm.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { AuthContext } from "../../context/AuthContext";
import { UserInformation } from "../UserInformation/UserInformation";

export function MyForm() {
  const { user } = useContext(AuthContext);
  const message = useRef();
  const [values, setValues] = useState("");

  useEffect(() => {
    socket.on("write", (values) => {
      setValues(values);
    });

    socket.on("stopWrite", (e) => {
      setValues("");
    });
  }, []);

  function submit(e) {
    e.preventDefault();
    if (message.current.value !== "") {
      socket.emit("message", {
        idUser: user.id,
        message: message.current.value,
      });
      document.getElementById("input").value = "";
    }
  }

  function onFocus() {
    socket.emit("write", user.id);
  }

  function onBlur() {
    socket.emit("stopWrite", "");
  }

  return (
    <>
      <UserInformation />
      <div className={styles.container}>
        {values && (
          <div className={styles.otherUserWrite}>
            {values.pseudo} est en train d'écrire un message
          </div>
        )}
        <form className={`${styles.container}`} onSubmit={submit}>
          <input
            autoComplete="off"
            className={`${styles.input}`}
            placeholder="Envoyer un message"
            id="input"
            onFocus={onFocus}
            onBlur={onBlur}
            ref={message}
          />
        </form>
      </div>
    </>
  );
}
