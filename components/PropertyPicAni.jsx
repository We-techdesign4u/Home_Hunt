import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import Animated, {
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalContextProvider";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PropertyPicItem = ({
  pic,
  initialRotation,
  initialMarginLeft,
  realignTrigger,
  touchablePic,
  onPicSelect,
}) => {
  const rotate = useSharedValue(initialRotation);
  const marginLeft = useSharedValue(initialMarginLeft);

  useEffect(() => {
    rotate.value = initialRotation;
    marginLeft.value = initialMarginLeft;
  }, []);

  useEffect(() => {
    if (realignTrigger > 0) {
      rotate.value = withSpring(0, {
        damping: 10,
        stiffness: 100,
      });
      marginLeft.value = withSpring(10, {
        damping: 10,
        stiffness: 100,
      });
    }
  }, [realignTrigger]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginLeft: marginLeft.value,
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  return (
    <Animated.View
      entering={ZoomIn.springify().delay(400).stiffness(200).damping(80)}
    >
      <Animated.View style={animatedStyle}>
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.4,
            shadowRadius: 7,
            elevation: 5,
          }}
          className="h-[60px] items-center justify-center shadow-black shadow-lg bg-white w-[60px] rounded-md"
        >
          {touchablePic ? (
            <TouchableOpacity
              onPress={() => onPicSelect(pic)}
              className="h-[50px] w-[50px] rounded-md z-20 absolute"
            ></TouchableOpacity>
          ) : (
            <View></View>
          )}

          <Image
            className="h-[50px] w-[50px] rounded-md"
            resizeMode="cover"
            source={{ uri: pic }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const PropertyPicAni = ({
  pictures,
  coverpicture: initialCoverPicturesArray,
  // favorites,
  id,
}) => {
  // console.log("infav", favorites);
  const [currentCoverPictureUri, setCurrentCoverPictureUri] = useState(
    initialCoverPicturesArray[0]
  );

  const [currentCoverPictureIndex, setCurrentCoverPictureIndex] = useState(0);
  const prevCoverPictureIndexRef = useRef(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const [touchablePic, setTouchablePic] = useState(false);
  const [realignTrigger, setRealignTrigger] = useState(0);
  const getRandomRotator = () =>
    (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15;

  const realign = () => {
    setRealignTrigger((prev) => prev + 1);
    setTouchablePic(true);
  };

  const handlePicSelect = (selectedPicUri) => {
    const newIndex = pictures.indexOf(selectedPicUri);

    if (newIndex === currentCoverPictureIndex) {
      return;
    }

    const direction = newIndex > currentCoverPictureIndex ? 1 : -1;
    const initialTranslate = direction * SCREEN_WIDTH;

    prevCoverPictureIndexRef.current = currentCoverPictureIndex;
    setCurrentCoverPictureIndex(newIndex);

    translateX.value = withTiming(-initialTranslate, { duration: 300 }, () => {
      runOnJS(setCurrentCoverPictureUri)(selectedPicUri);
      translateX.value = initialTranslate;

      translateX.value = withTiming(0, { duration: 300 });
    });
  };

  const coverImageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    };
  });

  const { currentUser, removeFav, addFav } = useGlobalContext();
  const checkIfFav = currentUser?.favorites?.includes(id) || false;
  const $id = id;
  const data = { $id: $id };
  // console.log(currentUser.favorites);

  return (
    <View className="h-[300px] w-full relative items-center">
      <Animated.Image
        className="h-[300px] absolute w-full"
        resizeMode="cover"
        source={{ uri: currentCoverPictureUri }}
        style={coverImageAnimatedStyle}
      />

      <View className="flex-row justify-between relative w-full p-4">
        <View></View>
        <View className="flex-row relative gap-2">
          <TouchableOpacity className="justify-center flex items-center">
            <View className="h-10 w-10  rounded-full justify-center items-center bg-black opacity-40"></View>
            <Image
              className="w-5 absolute h-5 "
              resizeMode="contain"
              tintColor={"#ffff"}
              source={icons.share}
            />
          </TouchableOpacity>

          {checkIfFav ? (
            <TouchableOpacity
              onPress={() => removeFav(data)}
              className="justify-center flex items-center"
            >
              <View className="h-10 w-10  rounded-full justify-center items-center bg-black opacity-40"></View>
              <Image
                className="w-6 h-6 absolute"
                resizeMode="contain"
                tintColor={"#ffff"}
                source={icons.fav}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => addFav(data)}
              className="justify-center flex items-center"
            >
              <View className="h-10 w-10  rounded-full justify-center items-center bg-black opacity-40"></View>
              <Image
                className="w-6 h-6 absolute"
                resizeMode="contain"
                tintColor={"#ffff"}
                source={icons.unfav}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={realign}
        className="flex-row items-center justify-center bottom-8 absolute z-50 rounded-lg"
      >
        {pictures.map((pic, index) => (
          <PropertyPicItem
            key={index}
            pic={pic}
            initialRotation={getRandomRotator()}
            initialMarginLeft={index !== 0 ? -25 : 0}
            realignTrigger={realignTrigger}
            touchablePic={touchablePic}
            onPicSelect={() => handlePicSelect(pic)}
          />
        ))}
      </TouchableOpacity>
    </View>
  );
};

export default PropertyPicAni;
