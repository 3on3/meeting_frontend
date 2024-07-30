import React from "react";
import MemberList from "../../../components/memberList/MemberList";
import imgOriginUrl from "../../../assets/images/profile.jpg";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DefaultInput from "../../../components/common/inputs/DefaultInput";

const GroupViewBody = ({ styles, auth }) => {
  const userName = "문지은";
  const univ = "건국대";
  const major = "현대미술과";
  return (
    <div className={styles.content2}>
      {auth === "joy" ? (
        <>
          <div className={styles.textLine2}>초대코드</div>
          <DefaultInput inputState={"disabled"} placeholder={"zN2D234HK"} />
        </>
      ) : null}

      <div className={styles.textLine}>현재 참여자</div>
      <ul className={styles.ul}>
        {/* 주최자 권한 일 경우 isLeader ={true} 전달 하면 됨 */}
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
          isLeader={true}
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
        <MemberList
          imgUrl={imgOriginUrl}
          userName={userName}
          univ={univ}
          major={major}
          bgColor="bgWhite"
        />
      </ul>
    </div>
  );
};

export default GroupViewBody;
