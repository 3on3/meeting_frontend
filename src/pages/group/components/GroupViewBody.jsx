import React, { useState } from "react";
import MemberList from "../../../components/memberList/MemberList";
import imgOriginUrl from "../../../assets/images/profile.jpg";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DefaultInput from "../../../components/common/inputs/DefaultInput";

const GroupViewBody = ({ auth, styles, users }) => {
  const [tab, setTab] = useState("current");

  return (
    <div className={styles.content2}>
      {(auth === "MEMBER" || auth === "HOST") && (
        <>
          <div className={styles.textLine2}>초대코드</div>
          <div className={styles.copyWrap}>
            <DefaultInput inputState={"disabled"} placeholder={"zN2D234HK"} />
            <button className={styles.copyBtn}></button>
          </div>
        </>
      )}

      {(auth === "MEMBER" || auth === "USER") && (
        <div className={styles.textLine}>현재 참여자</div>
      )}
      {auth === "HOST" && (
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${
              tab === "current" ? styles.active : ""
            }`}
            onClick={() => setTab("current")}
          >
            현재 참여자
          </div>
          <div
            className={`${styles.tab} ${
              tab === "applicants" ? styles.active : ""
            }`}
            onClick={() => setTab("applicants")}
          >
            참여 신청
          </div>
        </div>
      )}

      <ul className={styles.ul}>
        {tab === "current" ? (
          users.map((user) => (
            <MemberList
              key={user.id}
              imgUrl={imgOriginUrl}
              userName={user.name}
              univ={user.univName}
              major={user.major}
              bgColor="bgWhite"
              isLeader={user.auth === "HOST"}
            />
          ))
        ) : (
          <>{/* 만약 참여 신청자 데이터가 필요없다면 이 부분을 비워둡니다 */}</>
        )}
      </ul>
    </div>
  );
};

export default GroupViewBody;
