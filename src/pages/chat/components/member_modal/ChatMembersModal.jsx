import React from 'react';
import ModalLayout from '../../../../components/common/modal/ModalLayout';
import ChatMemberList from './ChatMemberList';
import imgOriginUrl from '../../../../assets/images/profile.jpg'

const ChatMembersModal = ({styles}) => {
  const imgUrl = imgOriginUrl;
  const userName = '문지은';
  const univ = '건국대';
  const major = '현대미술과'
  return (
    <ModalLayout>
      <h2 className={styles.modalTit}>참여자</h2>
      <div className={styles.tabBox}>
        <p className={styles.tabBtns}>
          <button className={styles.isActive}>건국대 킹카</button>
          <button>미녀들 모임</button>
        </p>
        {/* 주최자 tab */}
        <ul className={styles.userListWrap}>
          <ChatMemberList styles={styles} imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
          <ChatMemberList styles={styles} imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
          <ChatMemberList styles={styles} imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
        </ul>
        {/* 신청자 tab */}
        {/* <ul className={styles.userListWrap}>
          <ChatMemberList styles={styles} imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
          <ChatMemberList styles={styles} imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
          <ChatMemberList styles={styles} imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
        </ul> */}
      </div>
    </ModalLayout>
  );
};

export default ChatMembersModal;