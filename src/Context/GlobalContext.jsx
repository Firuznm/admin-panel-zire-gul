import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [showHiddenModal, setShowHiddenModal] = useState(false);

  const closeOpenModalFunc = () => {
    setShowHiddenModal(!showHiddenModal);
  };

  return (
      <GlobalContext.Provider value={{ showHiddenModal, closeOpenModalFunc }}>{children}</GlobalContext.Provider>
  );
};

const UseGlobalContext = () => useContext(GlobalContext);

export {  GlobalProvider, UseGlobalContext };
