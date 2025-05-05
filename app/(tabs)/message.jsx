import { View, Text, Image, ScrollView, FlatList } from "react-native";
import React from "react";
import Room from "../../components/Room";
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppWrite";
import { Query } from "react-native-appwrite";

import {
  getAllPosts,
  getCurrentUser,
  getRoom,
  client,
  databases,
  config,
} from "../../lib/appwrite";

import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { useCallback } from "react";
import { Redirect } from "expo-router";

const Message = () => {
  const { currentUser, rooms, setRooms, isLoggedIn } = useGlobalContext();
  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  // console.log(rooms);
  ////
  //}, [rooms, setRooms, getRoom])

  ///second one

  useEffect(() => {
    getRoom();

    const unSubed = client.subscribe(
      `databases.${config.databaseId}.collections.${config.roomCollectionId}.documents`,

      (response) => {
        // console.log(response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          ) &&
          !rooms.some((msg) => msg.$id === response.payload.$id)
        ) {
          // setChat((prevState) => [response.payload, ...prevState]);
          setRooms((prevState) => [response.payload, ...prevState]);
          console.log("A ROOM WAS created!!!");
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          setRooms((prevRooms) => {
            const updatedRooms = prevRooms.map((room) => {
              if (room.$id === response.payload.$id) {
                // console.log("Match found! Updating room:", room.$id);
                return {
                  ...room,
                  isSeenR: response.payload.isSeenR,
                  isSeenS: response.payload.isSeenS,
                  lastMessage: response.payload.lastMessage,
                  $updatedAt: response.payload.$updatedAt,
                };
              } else {
                return room;
              }
            });
            return updatedRooms;
          });

          // console.log("updated room", updatedRooms[1].isSeenS);
          // setRooms(updatedRooms);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A ROOM WAS DELETED!!!");
        }
      }
    );

    return () => {
      unSubed();
    };
  }, [rooms, getRoom]);

  const getRoom = async () => {
    const res = await databases.listDocuments(
      config.databaseId,
      config.roomCollectionId,
      // [Query.orderDesc("$createdAt"), Query.limit(20)],
      [
        Query.orderDesc("upDateAt"),
        Query.or([
          Query.equal("senderId", currentUser.$id),
          Query.equal("receiverId", currentUser.$id),
        ]),
        // Query.orderDesc("$createdAt"),
      ]
    );

    setRooms(res.documents);
  };

  return (
    <View className="w-full flex-1">
      <FlatList
        // inverted={true}
        data={rooms}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Room data={item} />}
      />
    </View>
  );
};

export default Message;
