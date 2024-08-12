import React from "react";
import styles from "./InviteModal.module.scss";

const InviteModal = ({ content }) => {
  return (
    <div className={`${styles.backDropLayer} ${styles.complete}`}>
      <div className={styles.modalContent}>
        <h2>{content}</h2>
      </div>
    </div>
  );
};

export default InviteModal;
