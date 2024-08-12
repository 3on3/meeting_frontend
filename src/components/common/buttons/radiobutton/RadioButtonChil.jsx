import React from "react";
import styles from "./RadioButton.module.scss";

// 사용예시
//  <RadioButton
//    name="contact" // => 버튼 그룹으로 만들 시 name 값 일치시키기
//    value="option1"
//    text="2:2"
//  />

const RadioButtonChil = ({
  children,
  text,
  name,
  value,
  defaultChecked,
  disabled,
  onChange,
  id,
}) => {
  return (
    <label className={styles.radioLabel}>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        defaultChecked={defaultChecked} // 라디오 버튼 체크 기본 설정
        disabled={disabled} // 라디오 버튼 비활성화
        className={styles.radioInput}
        onChange={onChange}
      />
      <span></span>
      {children}
    </label>
  );
};

export default RadioButtonChil;
