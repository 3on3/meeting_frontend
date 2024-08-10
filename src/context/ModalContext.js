import React, { createContext, useState, useContext } from "react";
import ModalLayout from "../components/common/modal/ModalLayout";

const ModalContext = createContext();
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [boxType, setBoxType] = useState(null);

  const openModal = (content, type) => {
    setModalContent(content);
    setIsOpen(true);
    setBoxType(type);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <ModalLayout
          modalContent={modalContent}
          boxType={boxType}
        ></ModalLayout>
      )}
    </ModalContext.Provider>
  );
};

// useModal 훅 생성
export const useModal = () => useContext(ModalContext);
