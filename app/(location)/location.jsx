import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import React, { useState, useEffect } from "react";
import { icons } from "../../constants";
import { Link, Redirect, router } from "expo-router";
import * as Location from "expo-location";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const MyLocation = () => {
  const duration = 2000;
  const easing = Easing.bezier(0.25, -0.5, 0.25, 1);
  const sv = useSharedValue(0);

  const [location, setLocation] = useState(
    Location.LocationObject | (null > null)
  );
  const [errorMsg, setErrorMsg] = useState("" | (null > null));
  // const [userAddress, setUserAddress] = useState("");
  const [showText, setShowText] = useState(false);
  const { userAddress, setUserAddress } = useGlobalContext();

  const getCurrentLocation = async (text) => {
    setShowText(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");

      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    const myAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    // const addresstostring = myAddress[0].city + " " +myAddress[0].
    setUserAddress(
      myAddress[0].city +
        ", " +
        myAddress[0].region +
        ", " +
        myAddress[0].country
    );
    // setShowText(true);
    // console.log("address", userAddress);
  };

  useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
    if (userAddress !== "") {
      router.replace({
        pathname: "/home",
        params: { address: userAddress },
      });

      sv.value = withRepeat(withTiming(1, { duration, easing }), -1);
    }
  }, [userAddress]);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Your location is " + userAddress;
    // console.log("location", location);
    // console.log("text", text);
  }

  const manualLocation = () => {
    setUserAddress("");
    router.push("/locationAccess");
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <SafeAreaView className="h-full bg-white ">
      <View>
        <View className="h-full justify-center items-center w-full ">
          <View className="h-[110] w-[110] rounded-full bg-gray-100 mb-10 justify-center items-center">
            <Image
              resizeMode="contain"
              tintColor={"#00B22D"}
              className="w-[50] h-[80]"
              source={icons.location}
            />
          </View>
          <Text className="font-InBold text-3xl text-center">
            What is Your Location?
          </Text>
          <Text className="text-center font-InMedium text-gray-700 text-lg mt-4">
            We need to know your location in order to {"\n"}suggest nearby
            servies
          </Text>

          {showText ? (
            <View className="flex items-center flex-row pt-4">
              <View className="w-[25px] h-[25px] mr-2 justify-center relative items-center ">
                <View className="w-[25px] h-[25px] bg-primary opacity-20 rounded-full"></View>
                <Animated.View
                  className=" absolute h-full w-full"
                  style={animatedStyle}
                >
                  <View className="absolute w-[12.5px] left-0 overflow-hidden h-[30px]">
                    <View className="w-[25px] h-[25px] bg-primary  rounded-full"></View>
                  </View>
                </Animated.View>
                <View className="w-[17px] h-[17px] bg-white absolute rounded-full"></View>
              </View>
              <Text className="text-primary text-[16px] font-InSemiBold">
                {text}
              </Text>
            </View>
          ) : (
            <View></View>
          )}
          <CustomButton
            title="Allow Location Access"
            handlePress={() => getCurrentLocation()}
            containerStyles="w-80 mt-8"
          />
          <TouchableOpacity
            onPress={() => manualLocation()}
            // href="/locationAccess"
          >
            <Text className="my-9 text-lg font-InSemiBold text-primary">
              Enter Location Manually
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyLocation;
