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
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import PropertyPicAni from "../../components/PropertyPicAni";

const TabBarHeight = 48;
const HeaderHeight = 370;
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

const CollapsibleTabView = () => {
  const params = useLocalSearchParams();

  const allData = JSON.parse(params.item);
  // console.log("first params", params);
  const {
    adType,
    title,
    state,
    country,
    lga,
    street,
    beds,
    bath,
    owner,
    amount,
    houseRules,
    desc,
    coverpicture,
    pictures,
    sqrt,
    creator,
    reviews,
    $id,
  } = allData;

  
  const [tabIndex, setIndex] = useState(0);
  const [routes] = useState([
    { key: "tab1", title: "About" },
    { key: "tab2", title: "Gallery" },
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
  const RenderHeader = ({ params }) => {
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
        <PropertyPicAni
          coverpicture={coverpicture}
          pictures={pictures}
          favorites={creator.favorites}
          id={$id}
        />
        <View className="mx-4 mt-6 bg-white">
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            className="text-2xl font-InSemiBold"
          >
            {title}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            className="text-tsecondary"
          >
            {street}, {state}, {country}
          </Text>
        </View>
      </Animated.View>
    );
  };

  //here is the footer
  const RenderFooter = ({ params }) => {
    return (
      <View className="absolute justify-between flex-1 items-center px-4 flex-row rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
        <View>
          <Text className="text-tsecondary font-InSemiBold">Total Price</Text>
          <Text>
            <Text className="text-[18px] text-primary font-InSemiBold ">
              {amount}
            </Text>{" "}
            /month
          </Text>
        </View>
        <CustomButton
          title="Book Now"
          // handlePress={() => router.push("/bookingOption",

          // )}

          handlePress={() =>
            router.push({
              pathname: "/bookingOption",
              params: { data: JSON.stringify(allData) },
            })
          }
          containerStyles="w-[185px]"
        />
      </View>
    );
  };

  //Delete content of tab1
  const rednerTab1Item = ({ item, index, params }) => {
    return (
      <View className="my-4 pb-[95px] mx-2">
        <View className="flex-row my-4">
          <View className="flex-row justify-center mr-7  items-center">
            <Image
              className="w-6 h-6 mr-2"
              resizeMode="contain"
              tintColor={"#00B22D"}
              source={icons.bed}
            />
            <Text className="font-InSemiBold mt-1 text-[14px]">
              {beds} Beds
            </Text>
          </View>
          <View className="flex-row justify-center mr-7  items-center">
            <Image
              className="w-6 h-6 mr-2"
              resizeMode="contain"
              tintColor={"#00B22D"}
              source={icons.bath}
            />
            <Text className="font-InSemiBold mt-1 text-[14px]">
              {bath} Bath
            </Text>
          </View>
          <View className="flex-row justify-center  items-center">
            <Image
              className="w-6 h-5 mr-2"
              resizeMode="contain"
              tintColor={"#00B22D"}
              source={icons.size}
            />
            <Text className="font-InSemiBold mt-1 text-[14px]">
              {sqrt} sqrt
            </Text>
          </View>
        </View>
        <Text className="leading-8 font-InSemiBold">Description</Text>
        <Text className="text-tsecondary">{desc}</Text>
        <View className="my-5">
          <Text className="font-InSemiBold text-[14px]">Listing Agent</Text>
          <View className=" my-3">
            <TouchableOpacity
              className="flex-row"
              onPress={() =>
                router.push({
                  pathname: "/MyProfile",
                  params: { creator: JSON.stringify(creator) },
                })
              }
            >
              <Image
                className="w-8 mr-3 h-8 rounded-full"
                source={{ uri: creator?.avatar }}
              />
              <View>
                <Text className="font-InSemiBold text-base">
                  {creator?.username}
                </Text>
                <Text className="text-sm text-tsecondary">
                  {creator?.city}, {creator?.country}
                </Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row absolute right-0">
              <TouchableOpacity
                className="w-8 h-8 justify-center items-center rounded-full mr-3 bg-white"
                onPress={() =>
                  router.push({
                    pathname: "/messages",
                    params: { creator: JSON.stringify(creator) },
                  })
                }
              >
                <Image
                  source={icons.text}
                  tintColor={"#00B22D"}
                  className="w-5 h-5 "
                />
              </TouchableOpacity>
              <TouchableOpacity className="w-8 h-8 justify-center items-center rounded-full mr-3 bg-white">
                <Image
                  source={icons.phone}
                  tintColor={"#00B22D"}
                  className="w-4 h-5 "
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  //Delete content of tab2

  const rednerTab2Item = ({ params }) => {
    // const dataString = pictures;
    // const data = dataString.split(",");
    // const data = [{ id: "1" }, { id: "2" }];
    // const data = datas;

    return (
      <FlatList
        className="pb-[95px]"
        keyExtractor={(item) => item.index}
        data={pictures}
        numColumns={2}
        ListHeaderComponent={({ item }) => (
          <View className="px-2 pt-3 flex-row justify-between">
            <Text className="font-InSemiBold">Gellery {pictures.length}</Text>
            <TouchableOpacity className="flex-row items-center">
              <Image
                source={icons.addImage}
                className="mr-1"
                tintColor={"#00B22D"}
              />
              <Text className="font-InSemiBold text-primary">add photo</Text>
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="">
            <View className="px-2">
              {/* <Text>{item}</Text> */}
              <Image
                source={{ uri: item }}
                className="h-[170px] mt-5 w-[170px] rounded-xl cover"
              />
            </View>
          </View>
        )}
      ></FlatList>
    );
  };

  //Delete content of tab3

  const rednerTab3Item = () => {
    return (
      <View className="my-4 flex-1 pb-[95px] w-full mx-2">
        <View className="flex-row justify-between">
          <Text className="font-InSemiBold">{reviews.length} Reviews</Text>
          <TouchableOpacity
            onPress={() => router.push("/addReview")}
            className="flex-row justify-center"
          >
            <Image source={icons.edit} tintColor={"#00B22D"} className="mr-2" />
            <Text className="text-primary font-InSemiBold">add reviews</Text>
          </TouchableOpacity>
        </View>
        <View className="h-4 my-4 flex-row">
          <Image
            className="mr-2 w-4 h-4 object-contain"
            source={icons.star}
            tintColor={"#FCBB44"}
          />
          <Image
            className="mr-2 w-4 h-4 object-contain"
            source={icons.star}
            tintColor={"#FCBB44"}
          />
          <Image
            className="mr-2 w-4 h-4 object-contain"
            source={icons.star}
            tintColor={"#FCBB44"}
          />
          <Image
            className="mr-2 w-4 h-4 object-contain"
            source={icons.star}
            tintColor={"#FCBB44"}
          />
          <Image
            className="mr-2 w-4 h-4 object-contain"
            source={icons.star}
            tintColor={"#FCBB44"}
          />
          <Text className="font-InSemiBold text-[17px]">5</Text>
        </View>
        <View>
          <View className="flex-row w-full mb-2 justify-between">
            <View>
              <Text>Agent Communication</Text>
            </View>
            <View className="items-center flex-row">
              <Image
                className="mr-2 w-4 h-4 object-contain"
                source={icons.star}
                tintColor={"#FCBB44"}
              />
              <Text className="font-InSemiBold text-[17px]">5</Text>
            </View>
          </View>
          <View className="flex-row w-full mb-2 justify-between">
            <View>
              <Text>Recommended to friends</Text>
            </View>
            <View className="items-center flex-row">
              <Image
                className="mr-2 w-4 h-4 object-contain"
                source={icons.star}
                tintColor={"#FCBB44"}
              />
              <Text className="font-InSemiBold text-[17px]">5</Text>
            </View>
          </View>
          <View className="flex-row w-full mb-2 justify-between">
            <View>
              <Text>Property as described</Text>
            </View>
            <View className="items-center flex-row">
              <Image
                className="mr-2 w-4 h-4 object-contain"
                source={icons.star}
                tintColor={"#FCBB44"}
              />
              <Text className="font-InSemiBold text-[17px]">5</Text>
            </View>
          </View>
        </View>

        <Review data={reviews} />
      </View>
    );
  };

  // slideable tab

  const renderLabel = ({ route, focused }) => {
    return (
      <Text
        className="text-[16px] text-tprimary "
        style={[{ opacity: focused ? 1 : 0.5 }]}
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
        numCols = 2;
        data = tab2Data;
        renderItem = rednerTab2Item;
        break;
      case "tab3":
        numCols = 2;
        data = tab3Data;
        renderItem = rednerTab3Item;
        break;
      default:
        return null;
    }

    return (
      //   <TabScene
      //     numCols={numCols}
      //     data={data}
      //     renderItem={renderItem}
      //     scrollY={scrollY}
      //     onMomentumScrollBegin={onMomentumScrollBegin}
      //     onScrollEndDrag={onScrollEndDrag}
      //     onMomentumScrollEnd={onMomentumScrollEnd}
      //     onGetRef={(ref) => {
      //       if (ref) {
      //         const found = listRefArr.current.find((e) => e.key === route.key);
      //         if (!found) {
      //           listRefArr.current.push({
      //             key: route.key,
      //             value: ref,
      //           });
      //         }
      //       }
      //     }}
      //   />

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
          // renderLabel={renderLabel}
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

  // const { $id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <RenderTabView params={params} />
      <RenderHeader params={params} />
      <RenderFooter params={params} />
    </View>
  );
};

const styles = StyleSheet.create({
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: "white" },
  indicator: { backgroundColor: "#00B22D", height: 3, borderRadius: 10 },
});

export default CollapsibleTabView;
