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
import LCard from "../../components/LCard";

import {
  getAllPosts,
  getLatestPosts,
  getCurrentUser,
} from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import { useGlobalContext } from "../../context/GlobalContextProvider";

import { useLocalSearchParams } from "expo-router";
import { add } from "date-fns";
import Animated, {
  ZoomIn,
  BounceInRight,
  withTiming,
} from "react-native-reanimated";
import InVcard from "../../components/InVcard";

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
      <Animated.FlatList
        // itemLayoutAnimation={ZoomIn.springify().stiffness(200).damping(80)}
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
                  <View>
                    {userAddress ? (
                      <Text className="font-InSemiBold text-base">
                        {userAddress}
                      </Text>
                    ) : (
                      <Text className="font-InSemiBold text-base">
                        Enter Location Here
                      </Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <Searchbar placeholder={"Search Property Type"}></Searchbar>

            <View className="h-[40px] px-4 mt-5 items-center justify-between flex-row">
              <Text className="text-sm text-tsecondary  font-InRegular mb-0">
                Recommended Property
              </Text>
              <Text className="text-primary font-InSemiBold">See All</Text>
            </View>

            {/* <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {latestPost.map((item) => {
                return (
                  <View
                    key={item.$id}
                    // entering={BounceInRight.springify()
                    //   .duration(1200)
                    //   .stiffness(200)
                    //   .damping(80)}
                  >
                    <InVcard item={item} />
                  </View>
                  // <View key={index}>
                  //   <InVcard item={item} />
                  // </View>
                );
              })}
            </ScrollView> */}
            <FlatList
              data={latestPost}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => <InVcard item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />

            {/* <Vcard data={latestPost} /> */}
            <View className="h-[40px] px-4 mt-5 items-center justify-between flex-row">
              <Text className="text-sm text-tsecondary font-InRegular mb-0">
                Nearby Property
              </Text>
              <Text className="text-primary font-InSemiBold">See All</Text>
            </View>
          </View>
        )}
        renderItem={({ item }) => <LCard item={item} />}
      />
    </View>
  );
};

export default Home;
