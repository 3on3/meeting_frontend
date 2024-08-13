import React, { createContext, useState, useContext } from "react";
import ModalLayout from "../components/common/modal/ModalLayout";

const ModalContext = createContext();
export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [boxType, setBoxType] = useState(null);

  const openModal = (content, type, children) => {
    setModalData({
      content,
      type,
      children,
    });
    setIsOpen(true)
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <ModalLayout
          modalContent={modalData.content}
          boxType={modalData.type}
          children={modalData.children}
        ></ModalLayout>
      )}
    </ModalContext.Provider>
  );
};

// useModal 훅 생성
export const useModal = () => useContext(ModalContext);
