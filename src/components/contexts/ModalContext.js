import React, { createContext, useState, useContext } from 'react';

// ModalContext oluşturuyoruz
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const showModal = (message) => setErrorMessage(message);

  const hideModal = () => setErrorMessage('');

  return (
    <ModalContext.Provider value={{ errorMessage, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};
