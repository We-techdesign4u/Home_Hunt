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
import { useGlobalContext } from "../../context/GlobalContextProvider";

const Search = () => {
  // const [NewQuery, setNewQuery] = useState("");
  const { userAddress, NewQuery, setNewQuery } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  const query = NewQuery;

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <View className="h-full">
      <FlatList
        keyboardShouldPersistTaps="always"
        data={posts}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={({ item }) => (
          <View className="mt-3">
            <View className="flex-row mx-4 items-center">
              <Text className="text-sm font-InRegular text-tsecondary">
                Enter your location and property type
              </Text>
            </View>

            <Searchbar
              initialQuery={query}
              placeholder={"Property type and location here"}
              // handlePress={searchPosts}
            ></Searchbar>

            <TouchableOpacity
              onPress={() => setNewQuery(userAddress)}
              className=" my-6 px-4 items-center flex-row"
            >
              <Image
                tintColor={"#00B22D"}
                className="w-[20] h-[20] mr-3"
                resizeMode="contain"
                source={icons.direction}
              />
              <Text className="text-left text-sm text-tsecondary font-InRegular">
                Use my current location
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="mx-4">
            <Hcard data={item} />
          </View>
        )}
      />
    </View>
  );
};

export default Search;
