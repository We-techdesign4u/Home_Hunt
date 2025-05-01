import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
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

const Search = () => {
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));
  const { query } = useLocalSearchParams();
  // console.log(query, posts);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <View className="h-full bg-white">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={({ item }) => (
          <View className="">
            <View className="flex-row justify-center items-center">
              <Text className="text-lg font-InMedium text-center">
                Enter Your Location
              </Text>
            </View>
            <Searchbar
              initialQuery={query}
              placeholder={"Address Here"}
            ></Searchbar>
            <TouchableOpacity className=" my-6 px-4 flex-row">
              <Image
                tintColor={"#00B22D"}
                className="w-[25] h-[25] mr-3"
                resizeMode="contain"
                source={icons.direction}
              />
              <Text className="text-left text-lg font-InSemiBold">
                Use my current location {query}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => <Hcard data={item} />}
      />
    </View>
  );
};

export default Search;
