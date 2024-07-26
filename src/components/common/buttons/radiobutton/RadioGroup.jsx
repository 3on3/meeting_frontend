import React from "react";
import { RadioContext } from "./RadioContext";

export function RadioGroup({ label, name, value, onChange, disabled, children }) {
  
  // 컨텍스트에 전달될 값
  const contextValue = {
    name,
    value,
    onChange,
    disabled,
  };

  return (
    // 라디오 버튼 그룹화
    <fieldset> 
      <legend>{label}</legend>
      <RadioContext.Provider value={contextValue}>
        {children}
      </RadioContext.Provider>
    </fieldset>
  );
}
