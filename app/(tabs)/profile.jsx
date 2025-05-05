import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import { Link, router, Redirect, useLocalSearchParams } from "expo-router";
import Setting from "../../components/setting";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { getCurrentUser } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppWrite";
import Logout from "../(otherPages)/logout";
import { endUser } from "../../lib/appwrite";

const Profile = () => {
  const {
    isLoggedIn,
    currentUser,
    setisLoggedIn,
    setCurrentUser,
    setUserAddress,
  } = useGlobalContext();
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoutScreen, setLogoutScreen] = useState(false);
  const logout = async () => {
    try {
      setIsSubmitting(true);
      await endUser();
      setisLoggedIn(false);
      setCurrentUser(null);
      // setUserAddress("Enter your address here");
      router.replace("/home");
      setLogoutScreen(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // console.log(creator);

  // if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <View className="h-full">
      {logoutScreen ? (
        <View className="absolute bottom-0 left-0 z-10 flex-1 w-full h-full">
          <View className="bg-black opacity-80 h-full w-full"></View>
          <View className="absolute z-20 justify-center  items-center px-4 rounded-t-2xl h-[180px] bottom-0 w-full bg-white">
            <Text className="font-InMedium mb-4 text-lg">Logout</Text>
            <Text className="font-InRegular text-tsecondary text-sm">
              Are you sure you want to LOGOUT?
            </Text>
            <View className="flex-row w-full  items-center justify-evenly my-5">
              <CustomButton
                title="Yes, Logout"
                handlePress={logout}
                containerStyles="w-[150px]"
                textStyles="text-lg font-InRegular"
                isLoading={isSubmitting}
              />
              <CustomButton
                className=""
                title="Cancel"
                textStyles="text-primary font-InRegular text-lg"
                handlePress={() => setLogoutScreen(false)}
                containerStyles="w-[150px] border-primary border-2 bg-white"
              />
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
      <View className="">
        <View className="justify-center h-[250px] mb-20 bg-slate-400 items-center">
          <View className="mt-20 -mb-[140px]">
            <View className="w-[92px] h-[92px] m-3  bg-white rounded-full justify-center items-center">
              {currentUser ? (
                <View>
                  {currentUser.profilePicture !== null ? (
                    <Image
                      source={{ uri: currentUser?.profilePicture }}
                      className="w-[92px] h-[92px] rounded-full justify-center items-center"
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={{ uri: currentUser?.avatar }}
                      className="w-[92px] h-[92px] rounded-full justify-center items-center "
                      resizeMode="cover"
                    />
                  )}
                </View>
              ) : (
                <Image
                  resizeMode="contain"
                  className="w-[70px] h-[70px] "
                  source={icons.profile}
                  tintColor={"#a3e635"}
                />
              )}
            </View>
            {currentUser ? (
              <Text className="text-center text-lg font-InSemiBold">
                {currentUser?.username}
              </Text>
            ) : (
              <Text className="text-center text-lg font-InSemiBold">Guest</Text>
            )}
          </View>
        </View>

        <View className="bg-white">
          {isLoggedIn ? (
            <Setting
              title="Your Profile"
              handleClick={() =>
                router.push({
                  pathname: "/MyProfile",
                  params: { creator: JSON.stringify(creator) },
                })
              }
              icon={icons.sprofile}
            />
          ) : (
            <Setting
              title="Your Profile"
              handleClick={() =>
                router.push({
                  pathname: "/sign-in",
                })
              }
              icon={icons.sprofile}
            />
          )}

          {isLoggedIn ? (
            <Setting title="Payment Methods" icon={icons.spayment} />
          ) : (
            <Setting
              title="Payment Methods"
              handleClick={() => router.push("/sign-in")}
              icon={icons.spayment}
            />
          )}

          <Setting
            title="Settings"
            handleClick={() => router.push("/profileSettings")}
            icon={icons.ssetting}
          />
          {/* <Setting
            title="Help Center"
            handleClick={() => router.push("/helpCenter")}
            icon={icons.shelp}
          /> */}
          <Setting
            title="Privacy Policy"
            handleClick={() => router.push("/privacyPolicy")}
            icon={icons.sprivacy}
          />
          {isLoggedIn ? (
            <Setting
              title="Log out"
              handleClick={() => setLogoutScreen(true)}
              icon={icons.slogout}
            />
          ) : (
            <Setting
              title="Log in"
              handleClick={() => router.push("/sign-in")}
              icon={icons.slogout}
            />
          )}
        </View>
        <Text className="mt-5 mb-2 ml-4 text-tsecondary font-InRegular text-sm">
          Resources
        </Text>
        <View className="bg-white">
          <Setting
            title="Support"
            handleClick={() => router.push("/helpCenter")}
            icon={icons.shelp}
          />
          <Setting
            title="Leave a feedback"
            handleClick={() => router.push("/privacyPolicy")}
            icon={icons.sprivacy}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
