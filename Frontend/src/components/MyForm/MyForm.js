import styles from './MyForm.module.scss';
import { useState } from "react";
import { socket } from "../../socket";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (value !== "") {
      setIsLoading(true);
      socket.timeout(100).emit("message", value, () => {
        setIsLoading(false);
      });
      document.getElementById("input").value = "";
      setValue("");
    }
  }

  return (
    <form className={`d-flex ${styles.container}`} onSubmit={submit}>
      <input autoComplete='off' className={`${styles.input}`} id="input" onChange={(e) => setValue(e.target.value)} />
      <button className={`${styles.button}`} type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
