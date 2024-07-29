import React from 'react';
import styles from './Checkbox.module.scss';


export function Checkbox({children, disabled, checked, onChange}) {
  return (
    <label>
      <input 
        type="checkbox" 
        className={styles.checkboxInput}
        disabled={disabled} 
        checked={checked}
        //checked 선택되면 onChange 인자로 true가 넘어가고
        //checked 선택되지 않으면 onChange 인자가 false로 넘어감.
        onChange={event => onChange(event.target.checked)} 
      />
        <span></span>
       {children}
    </label>
  );
}

export default Checkbox;