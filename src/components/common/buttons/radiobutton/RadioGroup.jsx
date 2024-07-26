import React from "react";
import { RadioContext } from "./RadioContext"

export function RadioGroup ({ label, children, ...rest }) {
  return (
    <fieldset>
      <legend>{label}</legend>
      <RadioContext.Provider value={rest}>
        {children}
      </RadioContext.Provider>
    </fieldset>
  );
}