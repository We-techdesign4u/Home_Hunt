import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { icons } from "../../constants";
import Searchbar from "../../components/searchbar";
import useAppwrite from "../../lib/useAppWrite";
import { getAllPosts, searchPosts } from "../../lib/appwrite";
import Hcard from "../../components/Hcard";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useState } from "react";
import GlobalContextProvider, {
  useGlobalContext,
} from "../../context/GlobalContextProvider";

const MyProperties = () => {
  const { NewQuery, setNewQuery } = useGlobalContext();
  const { data: posts } = useAppwrite(() => searchPosts(query));

  const query = NewQuery;

  return (
    <View className="h-full ">
      <FlatList
        keyboardShouldPersistTaps="always"
        data={posts}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={({ item }) => (
          <View className="mt-3">
            <Searchbar
              initialQuery={query}
              placeholder={"Property Address Here"}
              //   handlePress={searchPosts}
            ></Searchbar>
            <View className="w-12 h-12 rounded-full bg-primary absolute"></View>
          </View>
        )}
        renderItem={({ item }) => <Hcard data={item} />}
      />
    </View>
  );
};

export default MyProperties;

const header = () => {
  return (
    <View className="mt-3">
      <Searchbar
        initialQuery={query}
        placeholder={"Property Address Here"}
        //   handlePress={searchPosts}
      ></Searchbar>
      <View className="w-12 h-12 rounded-full bg-primary absolute"></View>
    </View>
  );
};

const createPropter = () => {
  return (
    <View className="absolute justify-between flex-1 items-center px-4 flex-row rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
      <CustomButton
        title="Book Now"
        handlePress={() => router.push("/bookingOption")}
        containerStyles="w-[185px]"
      />
    </View>
  );
};
