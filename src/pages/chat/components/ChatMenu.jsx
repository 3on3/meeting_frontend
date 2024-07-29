import React from 'react';

const ChatMenu = ({styles,active}) => {
  return (
    <nav className={active? `${styles.isActive} ${styles.chatMenu}`: styles.chatMenu}>
      <button className={styles.showMemberBtn}>참여자 보기</button>
      <button className={styles.delChatBtn}><a href='#'>채팅방 삭제</a></button>
    </nav>
  );
};

export default ChatMenu;