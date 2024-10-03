import React, { createContext, useState } from 'react';

export const PublisherContext = createContext();

export const PublisherProvider = ({ children }) => {
  const [publishers, setPublishers] = useState([]);

  return (
    <PublisherContext.Provider value={{ publishers, setPublishers }}>
      {children}
    </PublisherContext.Provider>
  );
};
