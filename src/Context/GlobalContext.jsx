import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  const [showHiddenAddModal, setShowHiddenAddModal] = useState(false);
  const [editForModal, setEditForModal] = useState(false);
  const [deleteForModal, setDeleteForModal] = useState(false)

  const closeOpenAddModalFunc = () => {
    setShowHiddenAddModal(!showHiddenAddModal);
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
        showHiddenAddModal,
        closeOpenAddModalFunc,
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
