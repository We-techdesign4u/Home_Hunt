import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState, useEffect } from "react";
import { icons } from "../../constants";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import Vcard from "../../components/Vcard";
import Hcard from "../../components/Hcard";
import Searchbar from "../../components/searchbar";
import EmptyState from "../../components/EmptyState";

import {
  getAllPosts,
  getLatestPosts,
  getCurrentUser,
} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import { useGlobalContext } from "../../context/GlobalContextProvider";

import { useLocalSearchParams } from "expo-router";

import { add } from "date-fns";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPost } = useAppwrite(getLatestPosts);
  const { address } = useLocalSearchParams();
  // console.log(address);

  // const { setCurrentUser, currentUser } = useGlobalContext();

  // console.log(posts[3].cretorIDtest);

  const [refreshing, setRefreshing] = useState(false);
  const { userAddress, setUserAddress } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const autoLocation = () => {
    setUserAddress("");
    router.push("/location");
  };

  return (
    <View className="h-full ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Property Found"
            subtitle="Be the first to upload a property"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={({ item }) => (
          <View className="">
            <View className="px-4 mt-4">
              <Text className="text-tsecondary">Location</Text>
              <TouchableOpacity
                onPress={() => autoLocation()}
                className=" flex-row mt-1 mb-3"
              >
                <Image
                  resizeMode="contain"
                  className="h-5 w-4 mr-2 "
                  tintColor={"#00B22D"}
                  source={icons.location}
                />
                {address ? (
                  <Text className="font-InSemiBold text-base">{address}</Text>
                ) : (
                  <Text className="font-InSemiBold text-base">
                    {userAddress}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <Searchbar placeholder={"Address Here"}></Searchbar>

            <View className="h-[40px] px-4 mt-5 items-center justify-between flex-row">
              <Text className="text-sm text-tsecondary  font-InRegular mb-0">
                Recommended Property
              </Text>
              <Text className="text-primary font-InSemiBold">See All</Text>
            </View>
            <Vcard data={latestPost} />
            <View className="h-[40px] px-4 mt-5 items-center justify-between flex-row">
              <Text className="text-sm text-tsecondary font-InRegular mb-0">
                Nearby Property
              </Text>
              <Text className="text-primary font-InSemiBold">See All</Text>
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/prod",
                params: { item: JSON.stringify(item) },
              })
            }
            className="h-[300px] bg-white mx-4 relative p-4 my-2 rounded-2xl "
          >
            <Image
              source={{ uri: item.coverpicture[0] }}
              className="w-full rounded-2xl mb-2 h-[155px]"
              resizeMode="cover"
            />
            <View className=" flex-1 justify-center items-center absolute  left-8 top-6">
              <View className="h-[30px] w-[90px] justify-center items-center rounded-full bg-white opacity-80"></View>
              <Text className="absolute text-black font-InSemiBold text-[15px]">
                {item.adType}
              </Text>
            </View>

            <TouchableOpacity className="h-[30px] w-[30px] justify-center items-center absolute  right-8 top-6">
              <View className="h-[30px] w-[30px] justify-center items-center rounded-full bg-black opacity-40"></View>

              <Image
                tintColor={"#ffffff"}
                className="h-4 absolute opacity-100 w-5"
                resizeMode="contain"
                source={icons.unfav}
              />
            </TouchableOpacity>
            <View className="flex-1">
              <View className="flex-row justify-between mb-1">
                <View className="flex-row items-center">
                  <Image
                    resizeMode="contain"
                    className="h-[15px] w-[15px] -ml-1 mr-1 "
                    tintColor={"#8B8B8B"}
                    source={icons.explore}
                  />
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    className="font-InSemiBold text-[13px] text-[#939498]"
                  >
                    {item.street}
                  </Text>
                </View>
                {/* <Text className="text-primary">Property {item.adType}</Text> */}
                <Text>4.5</Text>
              </View>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                className="text-[17px] font-InSemiBold mt-1"
              >
                {item.title}
              </Text>

              <Text>
                <Text className="text-[18px] text-primary font-InSemiBold ">
                  ${item.amount}
                </Text>{" "}
                /Month
              </Text>
              <View className="h-[1px] w-full bg-slate-100 mt-2"></View>
              <View className="flex-row h-[30px]">
                <View className="flex-row justify-center mr-7  items-center">
                  <Image
                    className="w-4 h-4 mr-2"
                    resizeMode="contain"
                    tintColor={"#D3D7D8"}
                    source={icons.bed}
                  />
                  <Text className="font-InSemiBold mt-1 text-[#D3D7D8] text-[14px]">
                    {item.beds} Beds
                  </Text>
                </View>
                <View className="flex-row justify-center mr-7  items-center">
                  <Image
                    className="w-4 h-4 mr-2"
                    resizeMode="contain"
                    tintColor={"#D3D7D8"}
                    source={icons.bath}
                  />
                  <Text className="font-InSemiBold text-[#D3D7D8] mt-1 text-[14px]">
                    {item.bath} Bath
                  </Text>
                </View>
                <View className="flex-row justify-center  items-center">
                  <Image
                    className="w-4 h-3 mr-2"
                    resizeMode="contain"
                    tintColor={"#D3D7D8"}
                    source={icons.size}
                  />
                  <Text className="font-InSemiBold text-[#D3D7D8] mt-1 text-[14px]">
                    {item.sqrt} sqrt
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
