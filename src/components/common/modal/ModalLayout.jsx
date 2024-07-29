import React from 'react';
import styles from './ModalLayout.module.scss';

console.log(styles);
const ModalLayout = ({children, className, title}) => {
  return (
    <div className={`${styles.backDropLayer}`}>
      <div className={styles.modal}>
      <button className={styles.modalClose}></button>

      <h2 className={styles.modalTit}>{title}</h2>

        {children}
      </div>
    </div>
  );
};

export default ModalLayout;