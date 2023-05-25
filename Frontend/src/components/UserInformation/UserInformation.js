import styles from "./UserInformation.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Parameter } from "./Parameter/Parameter";
import { socket } from "../../socket";

export function UserInformation() {
  const { user, logout } = useContext(AuthContext);
  const [onHover, setOnHover] = useState(false);

  useEffect(() => {
    const parameter = document.getElementById("parameter");
    parameter.addEventListener("mouseenter", () => {
      setOnHover(true);
    });
    parameter.addEventListener("mouseleave", () => {
      setOnHover(false);
    });
  }, []);

  function disconnect() {
    socket.disconnect();
    logout();
  }

  return (
    <div className="d-flex">
      <div>
        <div className={`${styles.pseudo}`}>{user.pseudo}</div>
        <div className={`${styles.email}`}>
          {user.email.length > 10
            ? user.email.substring(
                0,
                user.email.length - (user.email.length - 7)
              ) + "..."
            : user.email}
        </div>
      </div>
      <div
        onClick={disconnect}
        id="parameter"
        className={`${styles.parameter} d-flex align-item-center justify-content-center`}
      >
        <i className="fa-solid fa-right-from-bracket"></i>
      </div>
      {onHover ? <Parameter /> : ""}
    </div>
  );
}
