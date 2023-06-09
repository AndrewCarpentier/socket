import styles from "./Message.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { socket, addIdToSocket } from "../../socket";
import { MyForm } from "../../components/MyForm/MyForm";
import { ShowMessage } from "../../components/ShowMessage/ShowMessage";
import { ShowChannel } from "../../components/ShowChannel/ShowChannel";
import { ShowUser } from "../../components/ShowUser/ShowUser";

export function Message() {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const [userIdSendToSocket, setUserIdSendToSocket] = useState(false);

  useEffect(()=>{
    if (user) {
      if(!userIdSendToSocket){
        addIdToSocket(user.id)
        setUserIdSendToSocket(true)
        console.log(socket)
      }
      socket.connect();
  
      function onConnect(){
        console.log('connect')
      }
  
      socket.on('connect', onConnect)
  
      socket.emit('newConnection', "");

      return ()=> {
        socket.off('connect', onConnect)
      }
    }
  }, [user, userIdSendToSocket])
  

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
