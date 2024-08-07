import React from "react";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import styles from "./MeetingList.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import MatchingButton from "../../../components/common/buttons/matchingButton/MatchingButton";
import { useLoaderData } from "react-router-dom";

// matchingState={"complete"} 이면 매칭 완료
function MeetingList() {
  const meetingList = useLoaderData();

  return (
    <ul className={styles.meetingList}>
      
      {meetingList.map(group => <GroupBox key={group.id} group={group} />)}
    </ul>
  );
}

export default MeetingList;
