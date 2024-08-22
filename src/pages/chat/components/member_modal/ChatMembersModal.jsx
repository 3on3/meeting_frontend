import React, {useContext, useState} from "react";
import ChatMemberList from "../../../../components/memberList/MemberList";

const ChatMembersModal = ({ styles, memberList }) => {

    // 2개의 그룹을 나누기 위한 상태변수
    const [isGroup, setIsGroup] = useState(false);

    const fistGroupClickHandler = () => {
        if(isGroup === true) {
            setIsGroup(false);
        }
    }

    const secondGroupClickHandler = () => {
        if(isGroup === false) {
            setIsGroup(true);
        }
    }

  return (
      <div className={styles.tabBox}>
        <p className={styles.tabBtns}>
          <button
              onClick={fistGroupClickHandler}
              className = {!isGroup? styles.isActive : null}
          >
              {memberList.responseGroupName}
          </button>
          <button
              onClick={secondGroupClickHandler}
              className={isGroup? styles.isActive : null}
          >
              {memberList.requestGroupName}
          </button>
        </p>
        <ul key={'chatUserList'} className={styles.userListWrap}>
          {memberList &&
              isGroup ?
              memberList.requestChatUser.map(member =>
                  <ChatMemberList
                      key={member.userId}
                      imgUrl={member.imgUrl}
                      nickname={member.userNickname}
                      univ={member.univ}
                      major={member.major}
                      id={member.userId}
                      hostUser={memberList.requestHostUserId}
                  />
              ) :
              memberList.responseChatUser.map(member =>
                  <ChatMemberList
                      key={member.userId}
                      imgUrl={member.imgUrl}
                      nickname={member.userNickname}
                      univ={member.univ}
                      major={member.major}
                      id={member.userId}
                      hostUser={memberList.responseHostUserId}
                  />
              )
          }
        </ul>
      </div>

  );
};

export default ChatMembersModal;
