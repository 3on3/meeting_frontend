import { useContext } from "react";
import { RadioContext } from "./RadioContext";
import styles from "./Radio.module.scss"


export function Radio({children, name, value, defaultChecked, disabled}) {

  // useContext 훅을 통해 RadioContext의 값을 가져옴.
  const group = useContext(RadioContext);
  
  return ( 
  <label>
    <input 
    className={styles.radioInput} //스타일 적용
    type="radio" // 라디오 버튼 타입
    name={group.name} // 컨텍스트에서 가져온 그룹 이름
    value={value} // 라디오 버튼 값 설정
    defaultChecked={defaultChecked} // 기본 체크 상태
    disabled={disabled || group.disabled} // 버튼 비활성화
    cheked={group.value !== undefined ? value === group.value : undefined} // 라디오 버튼의 체크 상태를 그룹의 값에 따라 설정 
    onChange={(e) => group.onChange && group.onChange(e.target.value)} // 라디오 버튼 값 변경 시, 그룹의 onChange 핸들러 호출
    /> 
    {children} 
    </label>
    
  );
}