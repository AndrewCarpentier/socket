import styles from "./MyForm.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { AuthContext } from "../../context/AuthContext";
import { UserInformation } from "../UserInformation/UserInformation";
import GifPicker from "gif-picker-react";

const TENOR_API_KEY = "AIzaSyBLXlrIIzpnxN57sLl2rv7AJg-J5Hpg-Ws";

export function MyForm({ channel }) {
  const { user } = useContext(AuthContext);
  const message = useRef();
  const [values, setValues] = useState("");
  const [showGifPicker, setShowGifPicker] = useState(false);
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
    if (channel) {
      if (channel.privateMessage) {
        if (message.current.value !== "") {
          socket.emit(channel.id + "privateMessage", {
            message: message.current.value,
            idChannel: channel.id,
          });
        }
      } else {
        if (message.current.value !== "") {
          socket.emit(channel.id + "message", {
            message: message.current.value,
            idChannel: channel.id,
          });
        }
      }
    }
    socket.emit("stopWrite", "");
    document.getElementById("input").value = "";
  }

  function onChange(e) {
    if (e.target.value === "") {
      socket.emit("stopWrite", "");
    } else {
      socket.emit("write", user.id);
    }
  }

  function onBlur() {
    socket.emit("stopWrite", "");
  }

  function handleGifClick() {
    setShowGifPicker(!showGifPicker);
  }

  function onGifClick(e) {
    if (channel) {
      if (channel.privateMessage) {
        socket.emit(channel.id + "privateGif", {
          message: e.url,
          idChannel: channel.id,
        });
      } else {
        socket.emit(channel.id + "gif", {
          message: e.url,
          idChannel: channel.id,
        });
      }
    }
    setShowGifPicker(false);
  }

  return (
    <>
      <UserInformation />
      {showGifPicker && (
        <div className={styles.gifPicker}>
          <GifPicker tenorApiKey={TENOR_API_KEY} onGifClick={onGifClick} />
        </div>
      )}

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
            onChange={onChange}
            onBlur={onBlur}
            ref={message}
          />
          <div onClick={handleGifClick} className={`${styles.gif}`}>
            GIF
          </div>
        </form>
      </div>
    </>
  );
}
