import React from 'react';
import styles from './ModalLayout.module.scss';

console.log(styles);
const ModalLayout = ({children}) => {
  return (
    <div className={styles.backDropLayer}>
      <div className={styles.modal}>
        <button className={styles.modalClose}></button>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;