import { createContext, useContext, useState, useEffect } from "react";

import { getCurrentUser, fetchFav, updateFav } from "../lib/appwrite";

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
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          // setisLoggedIn(true);
          setCurrentUser(res);
          setisLoggedIn(true);
          fetchFav(res.favorites)
            .then((favData) => {
              if (favData) {
                // console.log("favData", favData);
                setFavs(favData);
              }
            })
            .catch((error) => {
              console.log("fetching fav error", error);
            });
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

  const updateUserContext = (updatedUser) => {
    setCurrentUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  };

  const removeFav = async (data) => {
    try {
      const newFavs = currentUser.favorites.filter((fav) => fav !== data.$id);

      updateUserContext({ ...currentUser, favorites: newFavs });
      await updateFav(newFavs, currentUser);
      setFavs((prevFavs) => prevFavs.filter((fav) => fav.$id !== data.$id));
    } catch (error) {}
  };

  const addFav = async (data) => {
    // console.log("Adding fav ID:", data.$id);
    const newFavs = [...currentUser.favorites, data.$id];

    updateUserContext({ ...currentUser, favorites: newFavs });
    await updateFav(newFavs, currentUser);
    fetchFav([data.$id])
      .then((res) => {
        if (res) {
          setFavs((prevState) => [...prevState, ...res]);
        }
      })
      .catch((error) => {
        console.log("fetching additoinal fav error", error);
      });

    // console.log("After addFav, updatedFavs:", updatedFavs);
  };

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
        updateUserContext,
        favs,
        setFavs,
        removeFav,
        addFav,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
