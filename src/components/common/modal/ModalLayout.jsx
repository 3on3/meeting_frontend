import React from 'react';
import styles from './ModalLayout.scss';

console.log(styles);
const ModalLayout = ({children}) => {
  return (
    <div className={styles.backDropLayer}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;