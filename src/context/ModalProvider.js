import React, { useState } from 'react';
import { ModalDispatchContext, ModalStateContext } from './ModalContext';

const ModalProvider = ({children}) => {
  const [openedModals, setOpenedModals] = useState([]);
  const open = (Component, props) => {
      setOpenedModals((modals) => {
          return [...modals, { Component, props }];
      });
  }
  const close = (Component) => {
      setOpenedModals((modals) => {
         return modals.filter(modal => modal.Component !== Component);
      });
  }
  
  const dispatch = {open, close};
  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalStateContext.Provider value={openedModals}>
          {children}
      </ModalStateContext.Provider>
    </ModalDispatchContext.Provider>
  );
};

export default ModalProvider;