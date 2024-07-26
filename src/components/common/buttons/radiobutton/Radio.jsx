import { useContext } from "react";
import { RadioContext } from "./RadioContext";


export function Radio({children, name, value, defaultChecked, disabled}) {

  // useContext 훅을 통해 RadioContext에 접근
  const group = useContext(RadioContext);
  
  return ( 
  <label>
    <input 
    type="radio" 
    name={name} 
    value={value} 
    defaultChecked={defaultChecked}
    disabled={disabled || group.disabled}
    cheked={group.value !== undefined ? value === group.value : undefined} 
    onChange={(e) => group.onChange && group.onChange(e.target.value)}
    /> 
    {children}
    </label>
    
  );
}