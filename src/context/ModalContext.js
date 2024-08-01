import { createContext, useContext } from "react";

export const ModalStateContext = createContext([]);
export const ModalDispatchContext = createContext({
  open:()=>{},
  close:()=>{}
})