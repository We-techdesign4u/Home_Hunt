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
import { getPropertyByID } from "../../lib/appwrite";

// const TabBarHeight = 48;
// const HeaderHeight = 0;
// const tab1ItemSize = (Dimensions.get("window").width - 30) / 1;
// const tab2ItemSize = (Dimensions.get("window").width - 40) / 2;

// ///  thw content tabscene hook each one ->
// const TabScene = ({
//   numCols,
//   data,
//   renderItem,
//   onGetRef,
//   scrollY,
//   onScrollEndDrag,
//   onMomentumScrollEnd,
//   onMomentumScrollBegin,
// }) => {
//   const windowHeight = Dimensions.get("window").height;

//   return (
//     <Animated.FlatList
//       scrollToOverflowEnabled={true}
//       numColumns={numCols}
//       ref={onGetRef}
//       scrollEventThrottle={16}
//       onScroll={Animated.event(
//         [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//         {
//           useNativeDriver: true,
//         }
//       )}
//       onMomentumScrollBegin={onMomentumScrollBegin}
//       onScrollEndDrag={onScrollEndDrag}
//       onMomentumScrollEnd={onMomentumScrollEnd}
//       ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//       ListHeaderComponent={() => <View style={{ height: 5 }} />}
//       contentContainerStyle={{
//         paddingTop: HeaderHeight + TabBarHeight,
//         paddingHorizontal: 10,
//         minHeight: windowHeight - TabBarHeight,
//       }}
//       showsHorizontalScrollIndicator={false}
//       data={data}
//       renderItem={renderItem}
//       showsVerticalScrollIndicator={false}
//       keyExtractor={(item, index) => index.toString()}
//     />
//   );
// };

// //collapsible tab view everything from here

// export const Propertiess = () => {
//   // const { data: posts, refetch } = useAppwrite(getAllPosts);
//   const { isLoggedIn, currentUser } = useGlobalContext();

//   const [tabIndex, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: "tab1", title: "My Properties" },
//     { key: "tab2", title: "Favorites" },
//     { key: "tab3", title: "Ongoing" },
//     { key: "tab4", title: "Completed" },
//     { key: "tab5", title: "Cancelled" },
//   ]);
//   const [tab1Data] = useState(Array(1).fill(0));
//   const [tab2Data] = useState(Array(1).fill(0));
//   const [tab3Data] = useState(Array(1).fill(0));
//   const [tab4Data] = useState(Array(1).fill(0));
//   const [tab5Data] = useState(Array(1).fill(0));
//   // const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const scrollY = useRef(new Animated.Value(0)).current;
//   let listRefArr = useRef([]);
//   let listOffset = useRef({});
//   let isListGliding = useRef(false);

//   //comeback
//   const { data: properties, refetch } = useAppwrite(() =>
//     getPropertyByID(currentUser.$id)
//   );

//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//   };

//   useEffect(() => {
//     scrollY.addListener(({ value }) => {
//       const curRoute = routes[tabIndex].key;
//       listOffset.current[curRoute] = value;
//     });
//     return () => {
//       scrollY.removeAllListeners();
//     };
//   }, [routes, tabIndex]);

//   const syncScrollOffset = () => {
//     const curRouteKey = routes[tabIndex].key;
//     listRefArr.current.forEach((item) => {
//       if (item.key !== curRouteKey) {
//         if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
//           if (item.value) {
//             item.value.scrollToOffset({
//               offset: scrollY._value,
//               animated: false,
//             });
//             listOffset.current[item.key] = scrollY._value;
//           }
//         } else if (scrollY._value >= HeaderHeight) {
//           if (
//             listOffset.current[item.key] < HeaderHeight ||
//             listOffset.current[item.key] == null
//           ) {
//             if (item.value) {
//               item.value.scrollToOffset({
//                 offset: HeaderHeight,
//                 animated: false,
//               });
//               listOffset.current[item.key] = HeaderHeight;
//             }
//           }
//         }
//       }
//     });
//   };

//   const onMomentumScrollBegin = () => {
//     isListGliding.current = true;
//   };

//   const onMomentumScrollEnd = () => {
//     isListGliding.current = false;
//     syncScrollOffset();
//   };

//   const onScrollEndDrag = () => {
//     syncScrollOffset();
//   };

//   //Here is where your header goes
//   const renderHeader = () => {
//     const y = scrollY.interpolate({
//       inputRange: [0, HeaderHeight],
//       outputRange: [0, -HeaderHeight],
//       extrapolateRight: "clamp",
//     });
//     return (
//       <Animated.View
//         className="absolute top-0 w-full bg-white"
//         style={{ height: HeaderHeight, transform: [{ translateY: y }] }}
//       >
//         <View className="h-[300px] w-full items-center"></View>
//       </Animated.View>
//     );
//   };

//   //here is the footer
//   const renderFooter = () => {
//     return (
//       <View className="absolute flex-1 items-center px-4 flex-row h-[90px] bottom-0 right-0">
//         <CustomButton
//           textStyles="text-[30px]  "
//           title="+"
//           handlePress={() => router.push("/addProperties")}
//           containerStyles="w-[50px] shadow-lg shadow-black h-[50px] "
//         />
//       </View>
//     );
//   };

//   //Delete content of tab1
//   const rednerTab1Item = () => {
//     return (
//       <View className="h-full">
//         <FlatList
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//           // keyboardShouldPersistTaps="always"
//           data={properties}
//           keyExtractor={(item) => item.$id}
//           renderItem={({ item }) => <UserPropertyCard item={item} />}
//         />
//       </View>
//     );
//   };

//   //Delete content of tab2

//   const rednerTab2Item = () => {
//     // console.log(data[0].title);
//     return (
//       <View>
//         <Text className="font-InSemiBold text-primary">add photo</Text>
//       </View>
//     );
//   };

//   //Delete content of tab3

//   const rednerTab3Item = () => {
//     return (
//       <View className="my-4 flex-1 pb-[95px] w-full mx-2">
//         <Text className="text-primary font-InSemiBold">add reviews</Text>
//       </View>
//     );
//   };
//   const rednerTab4Item = () => {
//     return (
//       <View className="my-4 flex-1 pb-[95px] w-full mx-2">
//         <Text className="text-primary font-InSemiBold">Completed</Text>
//       </View>
//     );
//   };
//   const rednerTab5Item = () => {
//     return (
//       <View className="my-4 flex-1 pb-[95px] w-full mx-2">
//         <Text className="text-primary font-InSemiBold">Cancelled</Text>
//       </View>
//     );
//   };

//   // slideable tab

//   const renderLabel = ({ route, focused }) => {
//     return (
//       <Text
//         className="text-[16px] text-tprimary "
//         style={[{ opacity: focused ? 1 : 0.5 }]}
//       >
//         {route.title}
//       </Text>
//     );
//   };

//   // where each tab content came from instead of scene.map
//   const renderScenes = ({ route }) => {
//     const focused = route.key === routes[tabIndex].key;
//     let numCols;
//     let data;
//     let renderItem;

//     switch (route.key) {
//       case "tab1":
//         numCols = 1;
//         data = tab1Data;
//         renderItem = rednerTab1Item;
//         break;
//       case "tab2":
//         numCols = 1;
//         data = tab2Data;
//         renderItem = rednerTab2Item;
//         break;
//       case "tab3":
//         numCols = 1;
//         data = tab3Data;
//         renderItem = rednerTab3Item;
//         break;
//       case "tab4":
//         numCols = 1;
//         data = tab3Data;
//         renderItem = rednerTab4Item;
//         break;
//       case "tab5":
//         numCols = 1;
//         data = tab3Data;
//         renderItem = rednerTab5Item;
//         break;

//       default:
//         return null;
//     }

//     return (
//       //   <TabScene
//       //     numCols={numCols}
//       //     data={data}
//       //     renderItem={renderItem}
//       //     scrollY={scrollY}
//       //     onMomentumScrollBegin={onMomentumScrollBegin}
//       //     onScrollEndDrag={onScrollEndDrag}
//       //     onMomentumScrollEnd={onMomentumScrollEnd}
//       //     onGetRef={(ref) => {
//       //       if (ref) {
//       //         const found = listRefArr.current.find((e) => e.key === route.key);
//       //         if (!found) {
//       //           listRefArr.current.push({
//       //             key: route.key,
//       //             value: ref,
//       //           });
//       //         }
//       //       }
//       //     }}
//       //   />

//       <TabScene
//         numCols={numCols}
//         data={data}
//         renderItem={renderItem}
//         scrollY={scrollY}
//         onMomentumScrollBegin={onMomentumScrollBegin}
//         onScrollEndDrag={onScrollEndDrag}
//         onMomentumScrollEnd={onMomentumScrollEnd}
//         onGetRef={(ref) => {
//           if (ref) {
//             const found = listRefArr.current.find((e) => e.key === route.key);
//             if (!found) {
//               listRefArr.current.push({
//                 key: route.key,
//                 value: ref,
//               });
//             }
//           }
//         }}
//       />
//     );
//   };

//   //Here is the slidable tab
//   const renderTabBar = (props) => {
//     const y = scrollY.interpolate({
//       inputRange: [0, HeaderHeight],
//       outputRange: [HeaderHeight, 0],
//       extrapolateRight: "clamp",
//     });

//     // const x = scrollx.interpolate({
//     //     inputRange: [0, HeaderHeight],
//     //     outputRange: [HeaderHeight, 0],
//     //     extrapolateRight: "clamp",
//     //    }
//     // )

//     return (
//       <Animated.View
//         style={{
//           top: 0,
//           zIndex: 1,
//           position: "absolute",
//           // transform: [{ translateY: y }],
//           width: "140%",
//         }}
//       >
//         <TabBar
//           {...props}
//           onTabPress={({ route, preventDefault }) => {
//             if (isListGliding.current) {
//               preventDefault();
//             }
//           }}
//           style={styles.tab}
//           // renderLabel={renderLabel}
//           indicatorStyle={styles.indicator}
//           scrollEnabled={true}
//         />
//       </Animated.View>
//     );
//   };

//   const RenderTabView = () => {
//     return (
//       <TabView
//         onIndexChange={(index) => setIndex(index)}
//         navigationState={{ index: tabIndex, routes }}
//         renderScene={renderScene}
//         renderTabBar={renderTabBar}
//         commonOptions={{ label: renderLabel }}
//         initialLayout={{
//           height: 0,
//           width: Dimensions.get("window").width,
//         }}
//       />
//     );
//   };

//   // output all

//   // const { $id } = useLocalSearchParams();

//   return (
//     <View style={{ flex: 1 }}>
//       {RenderTabView()}
//       {/* <RenderTabView /> */}

//       {renderFooter()}
//     </View>
//   );
// };

// export default Propertiess;

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
        <CustomButton
          textStyles="text-[30px]  "
          title="+"
          handlePress={() => router.push("/addProperties")}
          containerStyles="w-[50px] shadow-lg shadow-black h-[50px] "
        />
      </View>
    );
  };

  return (
    <View className="flex-1 mx-4">
      <RenderFooter />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // keyboardShouldPersistTaps="always"
        data={properties}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <UserPropertyCard item={item} />}
      />
    </View>
  );
};

const Favorites = () => <View style={{ flex: 1 }} />;
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
