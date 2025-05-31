import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { router, Tabs } from "expo-router";
import { icons } from "../../constants";
import { TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import { useGlobalContext } from "../../context/GlobalContextProvider";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={styles.tabMenuCont}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={styles.tabicons}
      />
    </View>
  );
};

const TabsLayout = () => {
  const [showOption, setShowOption] = useState(false);

  const { isLoggedIn, setisLoggedIn, setCurrentUser, currentUser } =
    useGlobalContext();

  const [creator, setCreator] = useState();

  useEffect(() => {
    user();

    return () => {};
  }, [currentUser]);

  const user = () => {
    try {
      setCreator(currentUser);
      // return currentUser;
    } catch (error) {}
  };
  // let userName = "Guest";

  // console.log(currentUser.username);
  // console.log(isLoggedIn);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#00B22D",
          tabBarInactiveTintColor: "#000000",
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 0.2,
            borderTopColor: "#D2D2D2",
            height: 54,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerLeft: () => (
              <View>
                <View>
                  {isLoggedIn ? (
                    <View>
                      <Text className="text-base">
                        Hi {currentUser.username}
                      </Text>
                      <Text className="font-InSemiBold  leading-none text-xl">
                        Welcome Back
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text className="text-base">Hi Guest </Text>
                      <Text className="font-InSemiBold  leading-none text-xl">
                        Welcome
                      </Text>
                    </View>
                  )}
                </View>
                {/* <Text className="text-base">Hi </Text> */}
              </View>
            ),
            headerRight: () => (
              <View className="h-[40px] w-[40px] rounded-full ">
                {isLoggedIn ? (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/MyProfile",
                        params: { creator: JSON.stringify(creator) },
                      })
                    }
                  >
                    {currentUser.profilePicture !== null ? (
                      <Image
                        source={{ uri: currentUser?.profilePicture }}
                        className="h-[40px] w-[40px] rounded-full justify-center items-center"
                        resizeMode="cover"
                      />
                    ) : (
                      <Image
                        source={{ uri: currentUser?.avatar }}
                        className="h-[40px] w-[40px] rounded-full justify-center items-center "
                        resizeMode="cover"
                      />
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/sign-in",
                      })
                    }
                    className="h-[40px] justify-center items-center w-[40px] bg-amber-300 rounded-full"
                  >
                    <Image
                      className="h-[30px] w-[30px]"
                      source={icons.profile}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ),
            headerStyle: {
              // backgroundColor: "#d7e7d4",
              backgroundColor: "#ffff",
            },
            headerLeftContainerStyle: {
              paddingLeft: 15,
            },
            headerRightContainerStyle: {
              paddingRight: 15,
            },

            headerTitle: "",
            title: "Home",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            headerRight: () => (
              <View className=" absolute right-4">
                {showOption ? (
                  <View
                    style={{
                      elevation: 3,
                      shadowColor: "black",
                      shadowOffset: "width:10, height:10",
                      display: "flex",
                    }}
                    className="w-[156px] shadow-md z-50 absolute h-[156px] p-3 justify-between bg-white right-0 top-[20px] rounded-[10px]"
                  >
                    <TouchableOpacity>
                      <Text className="text-lg font-InMedium">All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text className="text-lg font-InMedium">Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text className="text-lg font-InMedium">Rent</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text className="text-lg font-InMedium">Agents</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View></View>
                )}

                <TouchableOpacity
                  className=""
                  onPress={() => setShowOption(!showOption)}
                >
                  <Image
                    resizeMode="contain"
                    className="w-6"
                    tintColor={"#000000"}
                    source={icons.filter}
                  />
                </TouchableOpacity>
              </View>
            ),

            headerRightContainerStyle: {
              paddingRight: 15,
              justifyContent: "center",
              display: "flex",
              // alignItems: "center",
            },
            title: "Exlpore",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.explore} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="message"
          options={{
            title: "Inbox",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.message} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="properties"
          options={{
            title: "Properties",
            headerShown: true,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.favorite} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabicons: {
    width: 27,
    height: 25,
  },

  tabtext: {
    color: "#ffff",
  },

  tabtextonFoc: {
    color: "#ffff",
  },

  tabMenuCont: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
});
