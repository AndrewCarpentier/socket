import styles from "./Message.module.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { socket, addIdToSocket } from "../../socket";
import { MyForm } from "../../components/MyForm/MyForm";
import { ShowMessage } from "../../components/ShowMessage/ShowMessage";
import { ShowChannel } from "../../components/ShowChannel/ShowChannel";
import { ShowUser } from "../../components/ShowUser/ShowUser";
import { AddChannel } from "../../components/AddChannel/AddChannel";
import { ShowChannelList } from "../../components/ShowChannelList/ShowChannelList.";
import Header from "../../components/Header/Header";

export function Message() {
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const [userIdSendToSocket, setUserIdSendToSocket] = useState(false);
  const [showAddChannel, setShowAddChannel] = useState(false);
  const [resetChannels, setResetChannels] = useState(false);
  const [showMessages, setShowMessages] = useState(true);
  const [resetNewChannel, setResetNewChannel] = useState(false);
  const [showUserList, setShowUserList] = useState(true);
  const [showChannelList, setShowChannelList] = useState(true);
  const [idChannelActive, setIdChannelActive] = useState(0);

  useEffect(() => {
    if (user) {
      if (!userIdSendToSocket) {
        addIdToSocket(user.id);
        setUserIdSendToSocket(true);
      }
      socket.connect();

      function onConnect() {
        console.log("connect");
      }

      socket.on("connect", onConnect);

      socket.emit("newConnection", "");

      return () => {
        socket.off("connect", onConnect);
      };
    }
  }, [user, userIdSendToSocket]);

  function onShowAddChannel() {
    setShowAddChannel(!showAddChannel);
  }

  function onShowUserList() {
    setShowUserList(!showUserList);
  }

  function onShowChannelList() {
    setShowChannelList(!showChannelList);
  }

  return (
    <div className={`${styles.container} d-flex`}>
      <Header
        channel={channel}
        onShowUserList={onShowUserList}
        onShowChannelList={onShowChannelList}
      />
      <div className={styles.ShowChannel}>
        {showChannelList && (
          <ShowChannel
            setReset={setResetChannels}
            reset={resetChannels}
            chooseChannel={setChannel}
            onShowAddChannel={onShowAddChannel}
            onShowMessages={setShowMessages}
            setIdChannelActive={setIdChannelActive}
            idChannelActive={idChannelActive}
          />
        )}
      </div>
      {showMessages ? (
        <div className={styles.message}>
          {channel && (
            <ShowMessage
              channel={channel}
              reset={resetNewChannel}
              setReset={setResetNewChannel}
            />
          )}
        </div>
      ) : (
        <ShowChannelList setReset={setResetNewChannel} />
      )}
      <div>
        {channel && showMessages && showUserList && (
          <ShowUser channel={channel} chooseChannel={setChannel} />
        )}
      </div>
      <div className={`d-flex ${styles.form}`}>
        <MyForm channel={channel} />
      </div>
      {showAddChannel && (
        <AddChannel
          onShowAddChannel={onShowAddChannel}
          resetChannel={setResetChannels}
        />
      )}
    </div>
  );
}
