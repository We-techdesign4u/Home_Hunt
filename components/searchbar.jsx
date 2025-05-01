import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { searchPosts } from "../lib/appwrite";
import useAppwrite from "../lib/useAppWrite";
import GlobalContextProvider, {
  useGlobalContext,
} from "../context/GlobalContextProvider";

const Searchbar = ({ placeholder, initialQuery, handlePress }) => {
  const pathname = usePathname();

  // const [NewQuery, setNewQuery] = useState("");
  const { NewQuery, setNewQuery } = useGlobalContext();

  const [query, setQuery] = useState(initialQuery || "");

  // const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  return (
    <View className=" h-[40px] space-x-4 bg-white rounded-lg mx-4 px-4  mt-2 items-center flex-row">
      <TextInput
        value={query}
        // placeholderTextColor="#7b7b8d"
        placeholderTextColor="#9ca3af"
        placeholder={placeholder}
        onChangeText={(e) => setQuery(e)}
        className="flex-1 text-gray-700 font-InMedium text-base w-full"
      />
      <TouchableOpacity
        // onPress={() => handlePress(query)}

        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing text",
              "Please enter some text to search"
            );
          }

          if (pathname.startsWith("/explore")) {
            setNewQuery(query);
          } else {
            router.push("/explore");
            setNewQuery(query);
          }
        }}
      >
        <Image
          tintColor={"#00B22D"}
          className="w-5 h-5"
          resizeMode="contain"
          source={icons.search}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Searchbar;
