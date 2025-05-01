import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Formfield from "../../components/Formfield";
import CustomButton from "../../components/CustomButton";
import { useState, useEffect } from "react";
import { icons } from "../../constants";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { Alert } from "react-native";

const LocationAccess = () => {
  const { userAddress, setUserAddress } = useGlobalContext();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [myLocation, setMyLocation] = useState({
    state: "",
    country: "",
    city: "",
  });

  const RenderFooter = () => {
    const continueToNext = () => {
      if (!myLocation.state || !myLocation.city || !myLocation.country) {
        return Alert.alert("Please fill all the fields");
      }

      setUserAddress(
        myLocation.city + ", " + myLocation.state + ", " + myLocation.country
      );
      setShouldNavigate(true);
    };

    useEffect(() => {
      if (shouldNavigate && userAddress !== "") {
        router.replace({ pathname: "/home", params: { address: userAddress } });
        setShouldNavigate(false); // Reset the flag
      }
    }, [shouldNavigate, userAddress, router]);

    return (
      <View className="absolute justify-center items-center px-4 rounded-t-2xl h-[90px] bottom-0 w-full bg-white">
        <CustomButton
          title="Continue"
          handlePress={() => continueToNext(myLocation)}
          containerStyles="w-5/6"
        />
      </View>
    );
  };
  const autoLocation = () => {
    setUserAddress("");
    router.push("/location");
  };

  return (
    <View className="flex-1">
      <SafeAreaView className="h-full pt-4 ">
        <View className="px-4">
          <View className="flex-row justify-center items-center">
            <Text className="text-2xl font-InMedium text-center">
              Enter Your Location
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => autoLocation()}
            className=" my-6 flex-row"
          >
            <Image
              tintColor={"#00B22D"}
              className="w-[25] h-[25] mr-3"
              resizeMode="contain"
              source={icons.direction}
            />
            <Text className="text-left text-lg font-InSemiBold">
              Use my current location
            </Text>
          </TouchableOpacity>

          <View className="pt-5 border-t-[1px] border-gray-200 ">
            <Text className="tracking-widest text-[13px] font-InMedium text-tsecondary mb-1">
              ENTER YOUR LOCATION HERE
            </Text>
          </View>

          <View className="px-4 py-4 my-[9px] rounded-2xl w-full h-auto bg-white ">
            <Formfield
              tittle={"City*"}
              value={myLocation.city}
              tittlestyle={"font-InSemiBold"}
              placeholder={"CIty"}
              handleChangeText={(e) => {
                setMyLocation({ ...myLocation, city: e });
              }}
            />

            <Formfield
              tittle={"State*"}
              value={myLocation.state}
              tittlestyle={"font-InSemiBold"}
              placeholder={"State"}
              handleChangeText={(e) => {
                setMyLocation({ ...myLocation, state: e });
              }}
            />

            <Formfield
              tittle={"Country*"}
              value={myLocation.country}
              tittlestyle={"font-InSemiBold"}
              placeholder={"Country"}
              handleChangeText={(e) => {
                setMyLocation({ ...myLocation, country: e });
              }}
            />
          </View>
        </View>
      </SafeAreaView>

      <RenderFooter myLocation={myLocation} setMyLocation={setMyLocation} />
    </View>
  );
};

export default LocationAccess;
