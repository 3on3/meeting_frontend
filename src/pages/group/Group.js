import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupViewHead from "./components/GroupViewHead";
import styles from "./Group.module.scss";
import GroupViewBody from "./components/GroupViewBody";
import MtButtons from "../../components/common/buttons/MtButtons";
import { getUserToken } from "../../config/auth";
import { MYPAGEMATCHING_URL } from "../../config/host-config";
import RequestModal from "./components/modal/RequestModal";
import { GROUP_URL } from "../../config/host-config";

const Group = () => {
  const { id } = useParams();
  const [auth, setAuth] = useState("HOST");
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupUsers, setGroupUsers] = useState([]);

  console.log(groupUsers);

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
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupData();
    // console.log("asdasdasd" + groupData);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
    groupName,
    inviteCode,
    hostUser,
  } = groupData;

  let onClickHandler;

  const getButtonConfig = () => {
    switch (auth) {
      case "MEMBER":
        onClickHandler = async () => {
          try {
            const response = await fetch(`${GROUP_URL}/withdraw`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getUserToken()}`,
              },
              body: JSON.stringify({ groupId: id }),
            });

            if (response.ok) {
              // 성공 시 사용자에게 알림을 주거나 페이지를 리다이렉트
              alert("성공적으로 그룹을 나갔습니다.");
              window.location.href = "/";
            } else {
              const errorText = await response.text();
              console.error("Failed to leave the group:", errorText);
              alert("그룹을 나가는 데 실패했습니다.");
            }
          } catch (error) {
            console.error("Error leaving the group:", error);
            alert("그룹을 나가는 중 오류가 발생했습니다.");
          }
        };
        return { type: "apply", text: "이 그룹 나가기" };
      case "USER":
        onClickHandler = async () => {
          console.log("ddd");

          const payload = {
            requestGroupId: "1fc3a005-f582-4f44-9b54-410aa1a4b952",
            responseGroupId: "56a6e4f5-62d8-4169-a29d-4b92143a20cf",
          };
          const response = await fetch(`${MYPAGEMATCHING_URL}/createRequest`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          console.log(payload);

          if (response.ok) {
          } else {
            const errorText = await response.text();
            console.error(errorText);
          }
        };
        return { type: "cancel", text: "매칭 신청하기" };
      default:
        return { type: "", text: "" };
    }
  };

  const { type, text } = getButtonConfig();

  return (
    <>
      <GroupViewHead
        styles={styles}
        place={meetingPlace}
        age={averageAge}
        totalMember={totalMembers}
        gender={gender}
        groupName={groupName}
        auth={auth}
      />
      <GroupViewBody
        styles={styles}
        groupId={id}
        inviteCode={inviteCode}
        updateUsers={updateUsers}
        users={groupUsers}
        hostUser={hostUser}
        auth={auth}
        fetchGroupData={fetchGroupData}
      />
      {auth !== "HOST" && (
        <MtButtons
          eventType={"click"}
          buttonType={type}
          buttonText={text}
          eventHandler={onClickHandler}
          className={styles.groupBtn}
        />
      )}
      {auth === "HOST" && (
        <RequestModal groupId={id} group={groupData} styles={styles} />
      )}
    </>
  );
};

export default Group;
