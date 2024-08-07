import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupViewHead from "./components/GroupViewHead";
import styles from "./Group.module.scss";
import GroupViewBody from "./components/GroupViewBody";
import MtButtons from "../../components/common/buttons/MtButtons";

const Group = () => {
  const { id } = useParams();
  const [auth, setAuth] = useState("USER");
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`http://localhost:8253/group/${id}`);
        if (!response.ok) {
          throw new Error("오류!");
        }
        const data = await response.json();
        setGroupData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGroupData();
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

  const { meetingPlace, averageAge, totalMembers, gender, users } = groupData;

  const getButtonConfig = () => {
    switch (auth) {
      case "MEMBER":
        return { type: "apply", text: "이 그룹 나가기" };
      case "HOST":
        return { type: "apply", text: "그룹 삭제하기" };
      case "USER":
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
      />
      <GroupViewBody styles={styles} auth={auth} users={users} />
      <MtButtons
        eventType={"click"}
        buttonType={type}
        buttonText={text}
        className={styles.groupBtn}
      />
    </>
  );
};

export default Group;
