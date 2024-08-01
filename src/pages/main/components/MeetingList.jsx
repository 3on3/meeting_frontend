import React from "react";
import GroupBox from "../../../components/common/groupBoxs/GroupBox";
import styles from "./MeetingList.module.scss";
import MtButtons from "../../../components/common/buttons/MtButtons";
import MatchingButton from "../../../components/common/buttons/matchingButton/MatchingButton";

// matchingState={"complete"} 이면 매칭 완료
function MeetingList() {
  return (
    <ul className={styles.meetingList}>
      <GroupBox />
      <GroupBox matchingState={"complete"} />
      <GroupBox state={"sky"} />
      <GroupBox matchingState={"complete"} />
      <GroupBox state={"line"} />
      <GroupBox />
    </ul>
  );
}

export default MeetingList;
