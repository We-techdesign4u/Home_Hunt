import { createContext, useContext, useState, useEffect } from "react";

import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [NewQuery, setNewQuery] = useState("");
  const [newHeaderHeight, setNewHeaderHeight] = useState("");
  const [rooms, setRooms] = useState([]);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          // setisLoggedIn(true);
          setCurrentUser(res);
          setisLoggedIn(true);
          // console.log(res);
        } else {
          setisLoggedIn(false);
          setCurrentUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setisLoggedIn,
        currentUser,
        setCurrentUser,
        isLoading,
        NewQuery,
        setNewQuery,
        newHeaderHeight,
        setNewHeaderHeight,
        rooms,
        setRooms,
        userAddress,
        setUserAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
