import styles from "./Header.module.scss";

function Header({ channel, onShowUserList, onShowChannelList }) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.information} d-flex justify-content-center align-item-center`}
      >
        <i className={`fas fa-bars ${styles.burger}`} onClick={onShowChannelList}/>
        {channel != null && <span className="ml20">{channel.name}</span>}
        <i className={`fas fa-user ${styles.user}`} onClick={onShowUserList} />
      </div>
    </div>
  );
}

export default Header;
