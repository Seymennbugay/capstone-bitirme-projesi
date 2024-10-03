import React, { createContext, useState } from 'react';

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);

  return (
    <AuthorContext.Provider value={{ authors, setAuthors }}>
      {children}
    </AuthorContext.Provider>
  );
};
