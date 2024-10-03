import React, { createContext, useState } from 'react';

// BorrowContext oluşturuluyor
export const BorrowContext = createContext();

export const BorrowProvider = ({ children }) => {
  const [borrows, setBorrows] = useState([]);

  return (
    <BorrowContext.Provider value={{ borrows, setBorrows }}>
      {children}
    </BorrowContext.Provider>
  );
};
