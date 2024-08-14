import React, { useState, useEffect } from "react";
import MemberList from "../../../components/memberList/MemberList";
import imgOriginUrl from "../../../assets/images/profile.jpg";
import { getUserToken } from "../../../config/auth";
import InviteModal from "../../../components/common/modal/InviteModal";

const GroupViewBody = ({
  auth,
  styles,
  users,
  groupId,
  inviteCode,
  updateUsers,
  fetchGroupData,
  hostUser,
  groupSize,
  totalMember,
}) => {
  const [tab, setTab] = useState("current");
  const [applicants, setApplicants] = useState([]);
  const [modalContent, setModalContent] = useState("");

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
            throw new Error("초대 목록 불러기에 실패하였습니다.");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchApplicants();
    }
  }, [auth, groupId]);

  const handleAccept = async (applicantId) => {
    try {
      const response = await fetch(
        `http://localhost:8253/group/join-requests/${applicantId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );

      const message = await response.text();

      if (response.ok) {
        showModal(message);
        fetchGroupData();
        const newUser = applicants.find(
          (applicant) => applicant.id === applicantId
        );
        const newUsers = [...users, newUser];
        setApplicants(
          applicants.filter((applicant) => applicant.id !== applicantId)
        );
        updateUsers(newUsers);
      } else {
        showModal(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (applicantId) => {
    try {
      const response = await fetch(
        `http://localhost:8253/group/join-requests/${applicantId}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );
      if (response.ok) {
        setApplicants(
          applicants.filter((applicant) => applicant.id !== applicantId)
        );
      } else {
        throw new Error("가입 신청 거절에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      showModal("초대 코드가 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      showModal("클립보드 복사에 실패하였습니다.");
    }
  };

  const showModal = (message) => {
    if (modalContent != "") return;
    setModalContent(message);
    // 3초 후에 모달 닫기
    setTimeout(() => {
      setModalContent("");
    }, 1200);
  };

  // Modal content 업데이트를 감지
  useEffect(() => {
    if (modalContent) {
    }
  }, [modalContent]);

  return (
    <div className={styles.content2}>
      {(auth === "MEMBER" || auth === "HOST") && (
        <>
          <div className={styles.copyWrap}>
            <span>함께 미팅할 친구들을 초대해주세요!</span>
            <button
              className={styles.copyBtn}
              onClick={handleCopyToClipboard}
            ></button>
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
            참여 신청 {applicants.length > 0 && `(${applicants.length})`}
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
                auth={user.auth}
                id={user.id}
                hostUser={hostUser}
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
                hostUser={hostUser}
                isLeader={true}
                onAccept={() => handleAccept(applicant.id)}
                onCancel={() => handleCancel(applicant.id)}
              />
            ))}
      </ul>

      {/* 모달 표시 */}
      {modalContent && <InviteModal content={modalContent} />}
    </div>
  );
};

export default GroupViewBody;
