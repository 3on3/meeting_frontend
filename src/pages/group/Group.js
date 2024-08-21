import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import GroupViewHead from "./components/GroupViewHead";
import styles from "./Group.module.scss";
import GroupViewBody from "./components/GroupViewBody";
import MtButtons from "../../components/common/buttons/MtButtons";
import { getUserToken } from "../../config/auth";
import RequestModal from "./components/modal/RequestModal";
import { useFetchRequest } from "../../hook/useFetchRequest";
import { GROUP_URL } from "../../config/host-config";
import MyGroupSelectModal from "../../components/myGroupSelectModal/MyGroupSelectModal";
import { MainWebSocketContext } from "../../context/MainWebSocketContext";
import GroupViewHeadSkeleton from "./components/skeleton/GroupViewHeadSkeleton";
import GroupViewBodySkeleton from "./components/skeleton/GroupViewBodySkeleton";
import GroupDeleteModal from "./components/modal/GroupDeleteModal";
import { useModal } from "../../context/ModalContext";
import GroupLeaveModal from "./components/modal/GroupLeaveModal";
import InviteModal from "../../components/common/modal/InviteModal";
import Loading from "../../components/common/loading/Loading";

const Group = () => {
  const { id } = useParams();
  const [auth, setAuth] = useState("HOST");
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupUsers, setGroupUsers] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const { alarmFetch } = useFetchRequest();
  const mainSocket = useContext(MainWebSocketContext);
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");

  const { openModal } = useModal();
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const onClickAndSuccess = () => {
    setIsRequestSuccess(true);
    // 3초 후에 모달 닫기
    setTimeout(() => {
      setIsRequestSuccess(false);
    }, 1200);
  };


  

  const openConfirmModal = () => {
    openModal(
      "그룹 나가기",
      "completeMode",
      <GroupLeaveModal groupName={groupName} id={id} />
    );
  };

  const fetchGroupData = async () => {
    try {
      const response = await fetch(`${GROUP_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error("오류!");
      }
      const data = await response.json();

      setGroupData(data);
      setGroupUsers(data.users);
      setAuth(data.groupAuth); // auth 값을 설정

      setTimeout(()=>{
        setLoading(false);

      }, 500)
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [id, isChanged]);

  if (loading) {return (<div className={styles.container}><Loading/></div>)}

  

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!groupData) {
    return <div>No group data found</div>;
  }

  const updateUsers = (newUsers) => {
    setGroupUsers(newUsers);
    setGroupData((prevData) => ({
      ...prevData,
      users: newUsers,
      totalMembers: newUsers.length,
    }));
  };

  const {
    meetingPlace,
    averageAge,
    totalMembers,
    gender,
    nickname,
    profileImageUrl,
    groupName,
    inviteCode,
    hostUser,
    groupSize,
  } = groupData;

  const getButtonConfig = () => {
    switch (auth) {
      case "MEMBER":
        return {
          type: "apply",
          text: "이 그룹 나가기",

          onClickHandler: openConfirmModal, // 여기에서 모달 열기 함수 호출
        };
      case "USER":
        return {
          type: "cancel",
          text: "매칭 신청하기",
          onClickHandler: async () => {
            setModalActive(!modalActive);

            const hostUser = await alarmFetch(id);

            const socketMessage = {
              type: "matching",
              email: hostUser.email,
              responseGroupId: id,
            };

            mainSocket.mainWebSocket.send(JSON.stringify(socketMessage));
          },
        };
      default:
        return { type: "", text: "", onClickHandler: null };
    }
  };

  const { type, text, onClickHandler } = getButtonConfig();

  return (
    <div className={styles.container}>
      <GroupViewHead
        styles={styles}
        place={meetingPlace}
        age={averageAge}
        totalMember={totalMembers}
        groupSize={groupSize}
        gender={gender}
        groupName={groupName}
        auth={auth}
        id={id}
        users={groupUsers}
        hostUser={hostUser}
        updateUsers={updateUsers}
      />
      <GroupViewBody
        styles={styles}
        groupId={id}
        inviteCode={inviteCode}
        updateUsers={updateUsers}
        users={groupUsers}
        hostUser={hostUser}
        auth={auth}
        totalMember={totalMembers}
        fetchGroupData={fetchGroupData}
      />
      {auth !== "HOST" && status !== "REQUESITNG" && status !== "RESPONSE" && (
        <MtButtons
          eventType={"click"}
          buttonType={type}
          buttonText={text}
          eventHandler={onClickHandler}
          className={styles.groupBtn}
        />
      )}
      {status === "REQUESITNG" && (
        <MtButtons
          eventType={"click"}
          buttonType={"disabled"}
          buttonText={"이미 매칭 신청 중인 그룹이예요."}
          className={`${styles.groupBtn} ${styles.disable}`}
          // className={}
        />
      )}
      {status === "RESPONSE" && (
        <MtButtons
          eventType={"click"}
          buttonType={"disabled"}
          buttonText={"내 그룹에 매칭을 신청한 그룹이예요."}
          className={`${styles.groupBtn} ${styles.disable}`}
          // className={}
        />
      )}
      {auth === "HOST" && (
        <RequestModal groupId={id} group={groupData} styles={styles} />
      )}
      {/* 신청자 그룹 선택 ㅊ모달 */}
      {modalActive && (
        <MyGroupSelectModal
          // MyGroupSelectModal={MyGroupSelectModal}
          setIsChanged={setIsChanged}
          responseGroupId={id}
          setModalActive={setModalActive}
          onClickAndSuccess={onClickAndSuccess}
        />
      )}
      {isRequestSuccess && (
        <InviteModal content={"매칭신청이 완료되었습니다."} />
      )}
    </div>
  );
};

export default Group;
