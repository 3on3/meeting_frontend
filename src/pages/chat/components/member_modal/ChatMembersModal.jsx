import React from 'react';
import ModalLayout from '../../../../components/common/modal/ModalLayout';
import ChatMemberList from '../../../../components/memberList/MemberList';
import imgOriginUrl from '../../../../assets/images/profile.jpg'

const ChatMembersModal = ({styles}) => {
  const imgUrl = imgOriginUrl;
  const userName = '문지은';
  const univ = '건국대';
  const major = '현대미술과'
  return (
    <ModalLayout className={""} title={"채팅 참여자"}>
      <div className={styles.tabBox}>
        <p className={styles.tabBtns}>
          <button className={styles.isActive}>건국대 킹카</button>
          <button>미녀들 모임</button>
        </p>
        {/* 주최자 tab */}
        <ul className={styles.userListWrap}>
          <ChatMemberList imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
          <ChatMemberList imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
          <ChatMemberList imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
        </ul>
        {/* 신청자 tab */}
        {/* <ul className={styles.userListWrap}>
          <ChatMemberList imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
          <ChatMemberList imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
          <ChatMemberList imgUrl={imgUrl} userName={userName} univ={univ} major={major}/>
        </ul> */}
      </div>
    </ModalLayout>
  );
};

export default ChatMembersModal;