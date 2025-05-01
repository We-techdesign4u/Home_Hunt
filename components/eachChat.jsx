import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from "react-native";
import React from "react";
import { icons, images } from "../constants";
import * as FileSystem from "expo-file-system";
//import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { format, isToday, isThisWeek, parseISO } from "date-fns";
import { StorageAccessFramework } from "expo-file-system";

const Eachchat = ({
  data: { body, $createdAt, senderIDD, chatAttachment },
  setPictures,
}) => {
  const handleDownload = async (chatAttachmentt) => {
    const filename = chatAttachmentt.name;
    const imageUrl = { uri: chatAttachmentt.downloadLink };

    let fileUri = FileSystem.documentDirectory + `${chatAttachmentt.name}`;

    try {
      const res = await FileSystem.downloadAsync(imageUrl.uri, fileUri);

      saveFile(res.uri, filename, res.headers["content-type"]);
    } catch (err) {
      console.log("FS Err: ", err);
    }
  };

  const dateTime = $createdAt;
  const date = parseISO(dateTime);

  const MyDates = () => {
    if (isToday(date)) {
      return format(date, "h:mma"); // 12:22pm
    } else if (isThisWeek(date)) {
      let dDay = format(date, "EEEE");
      return format(date, "EEEE");
    } else {
      return format(date, "yyyy-MM-dd");
    }
  };

  const saveFile = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      // const folderUri =
      //   StorageAccessFramework.getUriForDirectoryInRoot("Download");

      // const permissions =
      //   await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      // const mediaLibraryPermissions =
      //   await MediaLibrary.requestPermissionsAsync();
      // if (mediaLibraryPermissions === "granted") {
      //   console.log("granted");
      try {
        const file = await MediaLibrary.createAssetAsync(uri);
        const folder = await MediaLibrary.getAlbumAsync("HomeHunt");

        if (folder == null) {
          await MediaLibrary.createAlbumAsync("HomeHunt", file, false);
          // console.log("created");
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([file], folder, false);
        }
      } catch (err) {
        console.log("Save err: ", err);
      }
      // } else if (mediaLibraryPermissions === "denied") {
      //   alert("please allow permissions to download");
      // }
    } else {
      shareAsync(uri);
    }

    // try {
    //   const folder = await MediaLibrary.getAlbumAsync({ album: "HomeHunt" });
    //   const fileExist = folder.folder.find((file) =>
    //     file.uri.includes(filename)
    //   );
    //   if (fileExist) {
    //     console.log("file exist");
    //   }

    //   // const files = StorageAccessFramework.getUriForDirectoryInRoot("HomeHunt");
    //   console.log("part", files);
    // } catch (err) {
    //   console.log("Save err: ", err);
    // }
  };

  return (
    <View>
      <View className="flex-row py-3">
        <View className="w-[40px]">
          <Image
            className="w-8 mr-3 mt-4 h-8 rounded-full"
            source={{ uri: senderIDD.avatar }}
          />
        </View>
        <View className="flex-1">
          <View className="flex-row  items-center justify-between">
            <View className=" mt-6 items-center  flex-row">
              <Text className="font-InSemiBold text-[12px] mr-3">
                {senderIDD.username}
              </Text>
              <Text className="text-[11px]">{<MyDates />}</Text>
            </View>
          </View>
          <Text className="">{body}</Text>
          {chatAttachment.length == 0 ? (
            <View></View>
          ) : (
            <View>
              {chatAttachment.length == 1 ? (
                <View className="w-full mt-[10px]  h-[250px]">
                  <View className="rounded-xl relative w-full h-[260px] bg-white">
                    <TouchableOpacity
                      onPress={() => setPictures(chatAttachment)}
                    >
                      <Image
                        source={{ uri: chatAttachment[0].previewUrl }}
                        resizeMode="cover"
                        className="w-full rounded-t-xl h-[230px]"
                      />
                    </TouchableOpacity>

                    <View className="flex-row h-[30px] items-center justify-between px-2">
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        className=" font-InSemiBold text-[12px]"
                      >
                        {chatAttachment[0].name}
                      </Text>
                      <Text className="font-InSemiBold text-[12px]">
                        {(chatAttachment[0].size / (1024 * 1024)).toFixed(2)}
                        .mb
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View className=" flex-wrap flex-row gap-2 mt-[7px] ">
                  {chatAttachment.map((file, index) => {
                    return (
                      <View
                        key={index}
                        className=" rounded-xl w-[150px] h-[180px] bg-white"
                      >
                        <TouchableOpacity
                          onPress={() => setPictures(chatAttachment)}
                        >
                          <Image
                            source={{ uri: file.previewUrl }}
                            resizeMode="cover"
                            className="w-[150px] rounded-t-xl h-[150px]"
                          />
                        </TouchableOpacity>

                        <View className="flex-row justify-between h-[30px] items-center px-2">
                          <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            className=" font-InSemiBold text-[12px]"
                          >
                            {file.name}
                          </Text>
                          <Text className=" font-InSemiBold text-[12px]">
                            {(file.size / (1024 * 1024)).toFixed(2)}
                            .mb
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Eachchat;
