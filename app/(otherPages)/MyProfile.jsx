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
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { icons, images } from "../../constants";
import { TouchableOpacity } from "react-native";
import Review from "../../components/review";
import CustomButton from "../../components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { format, isToday, isThisWeek, parseISO } from "date-fns";
import Hcard from "../../components/Hcard";

const TabBarHeight = 48;
const HeaderHeight = 230;
const tab1ItemSize = (Dimensions.get("window").width - 30) / 1;
const tab2ItemSize = (Dimensions.get("window").width - 40) / 2;

///  thw content tabscene hook each one ->
const TabScene = ({
  numCols,
  data,
  renderItem,
  onGetRef,
  scrollY,
  onScrollEndDrag,
  onMomentumScrollEnd,
  onMomentumScrollBegin,
}) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <Animated.FlatList
      scrollToOverflowEnabled={true}
      numColumns={numCols}
      ref={onGetRef}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
          useNativeDriver: true,
        }
      )}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollEnd={onMomentumScrollEnd}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      ListHeaderComponent={() => <View style={{ height: 5 }} />}
      contentContainerStyle={{
        paddingTop: HeaderHeight + TabBarHeight,
        paddingHorizontal: 10,
        minHeight: windowHeight - TabBarHeight,
      }}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

//collapsible tab view

const MyProfile = () => {
  const params = useLocalSearchParams();

  const user = JSON.parse(params.creator);
  // console.log("user", user);

  // const {
  //   creator,
  //   reviews,
  // } = allData;

  const { currentUser, isLoggedIn } = useGlobalContext();

  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tab1", title: "About" },
    { key: "tab2", title: "Properties" },
    { key: "tab3", title: "Review" },
  ]);
  const [tab1Data] = useState(Array(1).fill(0));
  const [tab2Data] = useState(Array(1).fill(0));
  const [tab3Data] = useState(Array(1).fill(0));
  const scrollY = useRef(new Animated.Value(0)).current;
  let listRefArr = useRef([]);
  let listOffset = useRef({});
  let isListGliding = useRef(false);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const curRoute = routes[tabIndex].key;
      listOffset.current[curRoute] = value;
    });
    return () => {
      scrollY.removeAllListeners();
    };
  }, [routes, tabIndex]);

  const syncScrollOffset = () => {
    const curRouteKey = routes[tabIndex].key;
    listRefArr.current.forEach((item) => {
      if (item.key !== curRouteKey) {
        if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
          if (item.value) {
            item.value.scrollToOffset({
              offset: scrollY._value,
              animated: false,
            });
            listOffset.current[item.key] = scrollY._value;
          }
        } else if (scrollY._value >= HeaderHeight) {
          if (
            listOffset.current[item.key] < HeaderHeight ||
            listOffset.current[item.key] == null
          ) {
            if (item.value) {
              item.value.scrollToOffset({
                offset: HeaderHeight,
                animated: false,
              });
              listOffset.current[item.key] = HeaderHeight;
            }
          }
        }
      }
    });
  };

  const onMomentumScrollBegin = () => {
    isListGliding.current = true;
  };

  const onMomentumScrollEnd = () => {
    isListGliding.current = false;
    syncScrollOffset();
  };

  const onScrollEndDrag = () => {
    syncScrollOffset();
  };

  //Here is where your header goes
  const RenderHeader = () => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [0, -HeaderHeight],
      extrapolateRight: "clamp",
    });

    return (
      <Animated.View
        className="absolute top-0 w-full bg-white"
        style={{ height: HeaderHeight, transform: [{ translateY: y }] }}
      >
        <View className="justify-center my-5 items-center">
          <View className="w-[92px] h-[92px] m-3  rounded-full justify-center items-center">
            {user?.profilePicture !== null ? (
              <Image
                source={{ uri: user?.profilePicture }}
                className="w-[92px] h-[92px] rounded-full justify-center items-center"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={{ uri: user?.avatar }}
                className="w-[92px] h-[92px] rounded-full justify-center items-center "
                resizeMode="cover"
              />
            )}
          </View>
          <Text className="text-center text-lg font-InSemiBold">
            {user?.username}
          </Text>
          <Text className="mt-0 mb-3">
            {user?.city}, {user?.state}, {user?.country}
          </Text>
          <View className="flex-row ">
            <Image
              className="mr-2 w-4 h-4 object-contain"
              source={icons.star}
              tintColor={"#FCBB44"}
            />
            <Text className="font-InSemiBold">5.0 &#40;290&#41; </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  //here is the footer
  const renderFooter = () => {
    return (
      <View className="absolute justify-between flex-1 items-center px-4 flex-row rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
        <View>
          <Text className="text-tsecondary font-InSemiBold">Total Price</Text>
          <Text>
            <Text className="text-[18px] text-primary font-InSemiBold ">
              $1,500
            </Text>{" "}
            /month
          </Text>
        </View>
        <CustomButton
          title="Book Now"
          handlePress={() => router.push("/bookingOption")}
          containerStyles="w-[185px]"
        />
      </View>
    );
  };

  //content of tab1
  const rednerTab1Item = ({ item, index }) => {
    const dateTime = user.$createdAt;
    const date = parseISO(dateTime);

    const MyDates = () => {
      if (isToday(date)) {
        return format(date, "h:mma");
      } else if (isThisWeek(date)) {
        let dDay = format(date, "EEEE");
        return format(date, "EEEE");
      } else {
        return format(date, "yyyy-MM-dd");
      }
    };

    return (
      <View className="my-4">
        <Text className="text-sm font-InRegular text-tsecondary mx-2 mb-2">
          User Information
        </Text>
        <View className="bg-white p-3 rounded-lg  mx-2">
          <Text>{user?.aboutMe}</Text>
          <View className=" my-3">
            <Text className="text-sm text-tsecondary">Phone</Text>
            <Text className="text-sm font-InRegular">{user?.phoneNumber} </Text>
          </View>
          <View className=" my-3">
            <Text className="text-sm text-tsecondary">Email</Text>
            <Text className="text-sm font-InRegular">{user?.email}</Text>
          </View>
          <View className=" my-3">
            <Text className="text-sm text-tsecondary">Address</Text>
            <Text className="text-sm font-InRegular">
              {user?.state}, {user?.country}
            </Text>
          </View>
          <View className=" my-3">
            <Text className="text-sm text-tsecondary">Member Since</Text>
            <Text className="text-sm font-InRegular">{<MyDates />}</Text>
          </View>
          <View className=" my-3">
            <Text className="text-sm text-tsecondary">Last Active</Text>
            <Text className="text-sm font-InRegular">Online </Text>
          </View>
          {user?.$id == currentUser?.$id ? (
            <TouchableOpacity
              className="flex-row justify-center items-center mt-4 py-2 bg-slate-500 "
              onPress={() => router.push("/profileUpdate")}
            >
              <Image
                className="h-4 mr-2 w-4"
                tintColor={"#00B22D"}
                source={icons.edit}
              />
              <Text className=" text-base font-InSemiBold text-primary">
                Edit
              </Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    );
  };

  //Delete content of tab2

  const rednerTab2Item = () => {
    return (
      <FlatList
        keyExtractor={(item) => item.$id}
        data={user.property}
        ListHeaderComponent={({ item }) => (
          <View className="px-2 pt-3 flex-row justify-between">
            <Text>header</Text>
          </View>
        )}
        renderItem={({ item }) => <Hcard data={item} />}
      ></FlatList>
    );
  };

  //Delete content of tab3

  const rednerTab3Item = () => {
    return (
      <View className="my-4 flex-1 pb-[95px] w-full mx-2">
        <View className="flex-row justify-between">
          <Text className="font-InSemiBold">Reviews</Text>
          <TouchableOpacity
            onPress={() => router.push("/addReview")}
            className="flex-row justify-center"
          >
            <Image source={icons.edit} tintColor={"#00B22D"} className="mr-2" />
            <Text className="text-primary font-InSemiBold">add reviews</Text>
          </TouchableOpacity>
        </View>

        <Review />
      </View>
    );
  };

  //no more usefull

  // slideable tab

  const renderLabel = ({ route, focused }) => {
    return (
      <Text
        className="text-[16px] text-tprimary font-InSemiBold"
        style={[{ color: "white", opacity: focused ? 1 : 0.5 }]}
      >
        {route.title}
      </Text>
    );
  };

  // where each tab content came from instead of scene.map
  const renderScene = ({ route }) => {
    const focused = route.key === routes[tabIndex].key;
    let numCols;
    let data;
    let renderItem;

    switch (route.key) {
      case "tab1":
        numCols = 1;
        data = tab1Data;
        renderItem = rednerTab1Item;
        break;
      case "tab2":
        numCols = 1;
        data = tab2Data;
        renderItem = rednerTab2Item;
        break;
      case "tab3":
        numCols = 1;
        data = tab3Data;
        renderItem = rednerTab3Item;
        break;
      default:
        return null;
    }

    return (
      <TabScene
        numCols={numCols}
        data={data}
        renderItem={renderItem}
        scrollY={scrollY}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onGetRef={(ref) => {
          if (ref) {
            const found = listRefArr.current.find((e) => e.key === route.key);
            if (!found) {
              listRefArr.current.push({
                key: route.key,
                value: ref,
              });
            }
          }
        }}
      />
    );
  };

  //Here is the slidable tab
  const renderTabBar = (props) => {
    const y = scrollY.interpolate({
      inputRange: [0, HeaderHeight],
      outputRange: [HeaderHeight, 0],
      extrapolateRight: "clamp",
    });
    return (
      <Animated.View
        style={{
          top: 0,
          zIndex: 1,
          position: "absolute",
          transform: [{ translateY: y }],
          width: "100%",
        }}
      >
        <TabBar
          {...props}
          onTabPress={({ route, preventDefault }) => {
            if (isListGliding.current) {
              preventDefault();
            }
          }}
          style={styles.tab}
          indicatorStyle={styles.indicator}
        />
      </Animated.View>
    );
  };

  const RenderTabView = () => {
    return (
      <TabView
        onIndexChange={(index) => setIndex(index)}
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        commonOptions={{ label: renderLabel }}
        initialLayout={{
          height: 0,
          width: Dimensions.get("window").width,
        }}
      />
    );
  };

  // output all

  return (
    <View style={{ flex: 1 }}>
      <RenderTabView user={user} />

      <RenderHeader user={user} />
      {/* {renderFooter()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: "#00B22D" },
  indicator: { backgroundColor: "white", height: 2, borderRadius: 10 },
});

export default MyProfile;
