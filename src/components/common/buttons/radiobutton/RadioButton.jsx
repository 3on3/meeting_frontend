import React, { useState } from 'react';
import styles from './RadioButton.module.scss';

const RadioButton = () => {
  const [selected, setSelected] = useState(null);

  const handleRadioClick = (value) => {
    setSelected(value);
  };

  // 사용예시
  // 라디오 버튼 여러개 만들고 싶을 경우 아래 배열 추가해주면 됨.

  const options = [
    { value: "option1", label: "2:2" },
    // { value: "option2", label: "3:3" },
    // { value: "option3", label: "4:4" },
    // { value: "option4", label: "5:5" },
  ];

  return (
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            name="radioToggle"
            value={option.value}
            checked={selected === option.value}
            onClick={() => handleRadioClick(option.value)}
            className={styles.radioInput}
            readOnly
          />
          <label 
            onClick={() => handleRadioClick(option.value)}
            className={selected === option.value ? styles.labelSelected : styles.label}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
