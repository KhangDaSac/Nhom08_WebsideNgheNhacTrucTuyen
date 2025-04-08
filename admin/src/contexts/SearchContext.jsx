import { createContext, useState, useContext } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('');

  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};
