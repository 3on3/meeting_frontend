import React, { useState, useEffect } from "react";
import MemberList from "../../../components/memberList/MemberList";
import imgOriginUrl from "../../../assets/images/profile.jpg";
import MtButtons from "../../../components/common/buttons/MtButtons";
import DefaultInput from "../../../components/common/inputs/DefaultInput";
import { getUserToken } from "../../../config/auth";

const GroupViewBody = ({ auth, styles, users, groupId, inviteCode }) => {
  const [tab, setTab] = useState("current");
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    if (auth === "HOST") {
      const fetchApplicants = async () => {
        try {
          const response = await fetch(
            `http://localhost:8253/group/invite/${groupId}`,
            {
              headers: {
                Authorization: `Bearer ${getUserToken()}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setApplicants(data);
          } else {
            throw new Error("Failed to fetch applicants");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchApplicants();
    }
  }, [auth, groupId]);

  console.log(applicants);

  return (
    <div className={styles.content2}>
      {(auth === "MEMBER" || auth === "HOST") && (
        <>
          <div className={styles.textLine2}>초대코드</div>
          <div className={styles.copyWrap}>
            <DefaultInput inputState={"disabled"} placeholder={inviteCode} />
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
            e
          >
            참여 신청
          </div>
        </div>
      )}

      <ul className={styles.ul}>
        {tab === "current"
          ? users.map((user) => (
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
          : applicants.map((applicant) => (
              <MemberList
                key={applicant.id}
                imgUrl={imgOriginUrl}
                userName={applicant.userName}
                univ={applicant.userUnivName}
                major={applicant.userMajor}
                bgColor="bgWhite"
                isLeader={true} // 신청자는 리더가 아닙니다.
              />
            ))}
      </ul>
    </div>
  );
};

export default GroupViewBody;
