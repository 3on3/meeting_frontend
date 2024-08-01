import React from "react";
import styles from "./MatchingButton.module.scss";

function MatchingButton({ text, onClickHandler }) {
  return (
    <button className={styles.matchingBt} onClick={onClickHandler}>
      {text}
    </button>
  );
}

export default MatchingButton;
