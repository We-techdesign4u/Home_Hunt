import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  FlatList,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { icons, images } from "../../constants";
import { TouchableOpacity } from "react-native";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

import GlobalContextProvider, {
  useGlobalContext,
} from "../../context/GlobalContextProvider";
import useAppwrite from "../../lib/useAppWrite";
import UserPropertyCard from "../../components/UserPropertyCard";
import { getPropertyByID, fetchFav } from "../../lib/appwrite";
import Hcard from "../../components/Hcard";
import EmptyState from "../../components/EmptyState";

// newexport

const MyProperties = () => {
  const { isLoggedIn, currentUser } = useGlobalContext();
  const { data: properties, refetch } = useAppwrite(() =>
    getPropertyByID(currentUser.$id)
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const RenderFooter = () => {
    return (
      <View className="absolute z-50 flex-1 items-center px-4 flex-row h-[90px] bottom-0 right-0">
        {isLoggedIn ? (
          <CustomButton
            textStyles="text-[30px]"
            title="+"
            handlePress={() => router.push("/addProperties")}
            containerStyles="w-[50px] shadow-lg shadow-black h-[50px]"
          />
        ) : (
          <CustomButton
            textStyles="text-[30px]"
            title="+"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-[50px] shadow-lg shadow-black h-[50px]"
          />
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 mx-4">
      <RenderFooter />
      <FlatList
        ListEmptyComponent={() => (
          <EmptyState title="No Property Found" subtitle="Upload a property" />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // keyboardShouldPersistTaps="always"
        data={properties}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Hcard data={item} />}
      />
    </View>
  );
};

const Favorites = () => {
  const { isLoggedIn, currentUser, favs, setFavs } = useGlobalContext();

  // const { data: allFav, refetch } = useAppwrite(() =>
  //   fetchFav(currentUser.favorites)
  // );
  // console.log("inappfav", favs);

  // setFavs((prevState) => [...prevState, allFav]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <View className="flex-1 mx-4">
      <FlatList
        data={favs}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Hcard data={item} />}
      />
    </View>
  );
};
const Ongoing = () => <View style={{ flex: 1 }} />;

const Completed = () => <View style={{ flex: 1 }} />;

const Cancelled = () => <View style={{ flex: 1 }} />;

const renderScene = SceneMap({
  first: MyProperties,
  second: Favorites,
  third: Ongoing,
  forth: Completed,
  fifth: Cancelled,
});

const routes = [
  { key: "first", title: "MyProperties" },
  { key: "second", title: "Favorites" },
  { key: "third", title: "Ongoing" },
  { key: "forth", title: "Completed" },
  { key: "fifth", title: "Cancelled" },
];

const Properties = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        scrollEnabled={true}
        style={styles.tab}
        // renderLabel={renderLabel}
        indicatorStyle={styles.indicator}
      />
    );
  };

  const renderLabel = ({ route, labelText, focused, color }) => {
    return (
      <Text
        className="text-[16px] text-tprimary "
        style={[{ opacity: focused ? 1 : 0.5 }]}
      >
        {labelText ?? route.name}
      </Text>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: layout.width }}
      commonOptions={{ label: renderLabel }}
    />
  );
};

export default Properties;

const styles = StyleSheet.create({
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: "white" },
  indicator: { backgroundColor: "#00B22D", height: 3, borderRadius: 10 },
});
