import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [showHiddenModal, setShowHiddenModal] = useState(false);
  const [editForModal, setEditForModal] = useState(false);
  const [deleteForModal, setDeleteForModal] = useState(false)

  const closeOpenModalFunc = () => {
    setShowHiddenModal(!showHiddenModal);
  };

  const editForModalShowHiddenFunc = () => {
    setEditForModal(!editForModal);
  }

  const deleteForModalShowHiddenFunc = () => {
    setDeleteForModal(!deleteForModal)
    console.log("delete cliked !!!");
    
  }
  return (
    <GlobalContext.Provider
      value={{
        showHiddenModal,
        closeOpenModalFunc,
        editForModalShowHiddenFunc,
        editForModal,
        deleteForModalShowHiddenFunc,
        deleteForModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const UseGlobalContext = () => useContext(GlobalContext);

export {  GlobalProvider, UseGlobalContext };
