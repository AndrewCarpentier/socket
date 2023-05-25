import styles from "./UserInformation.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { socket } from "../../socket";

export function UserInformation() {
  const { user, logout } = useContext(AuthContext);

  function disconnect() {
    socket.disconnect();
    logout();
  }

  return (
    <div className="d-flex">
      <div className={`${styles.user}`}>
        <div className={`${styles.pseudo}`}>{user.pseudo}</div>
        <div className={`${styles.email}`}>
          {user.email.length > 10
            ? user.email.substring(
                0,
                user.email.length - (user.email.length - 10)
              ) + "..."
            : user.email}
        </div>
      </div>
      <div
        onClick={disconnect}
        id="parameter"
        className={`${styles.tooltip} d-flex align-item-center justify-content-center`}
      >
        <i className={`fa-solid fa-right-from-bracket`}></i>
        <div className={`${styles.tooltiptext}`}>disconnect</div>
      </div>
    </div>
  );
}
