import styles from "./MyForm.module.scss";
import { useContext, useState } from "react";
import { socket } from "../../socket";
import { AuthContext } from "../../context/AuthContext";
import { UserInformation } from "../UserInformation/UserInformation";

export function MyForm() {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    if (value !== "") {
      setIsLoading(true);
      socket
        .timeout(100)
        .emit("message", { idUser: user.id, message: value }, () => {
          setIsLoading(false);
        });
      document.getElementById("input").value = "";
      setValue("");
    }
  }

  return (
    <>
    <UserInformation/>
    <form className={`d-flex ${styles.container}`} onSubmit={submit}>
      <input
        autoComplete="off"
        className={`${styles.input}`}
        placeholder="Envoyer un message"
        id="input"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
    </>
  );
}
