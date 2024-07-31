import React, { useState } from "react";
import MemberList from "../../../components/memberList/MemberList";
import imgOriginUrl from "../../../assets/images/profile.jpg";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DefaultInput from "../../../components/common/inputs/DefaultInput";

const GroupViewBody = ({ auth, styles }) => {
  const [tab, setTab] = useState("current");
  const userName = "문지은";
  const univ = "건국대";
  const major = "현대미술과";

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
          <>
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
          </>
        ) : (
          <>
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
              isLeader={true}
            />
          </>
        )}
      </ul>
    </div>
  );
};

export default GroupViewBody;
