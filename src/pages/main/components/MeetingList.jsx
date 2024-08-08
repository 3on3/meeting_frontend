import React from "react";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import styles from "./MeetingList.module.scss";

// matchingState={"complete"} 이면 매칭 완료
function MeetingList({ meetingList }) {
  return (
    <ul className={styles.meetingList}>
      {meetingList.map((group) => (
        <GroupBox key={group.id} group={group} />
      ))}
    </ul>
  );
}

export default MeetingList;
