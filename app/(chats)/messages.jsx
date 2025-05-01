import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  Platform,
} from "react-native";
import React from "react";
import OtherFormField from "../../components/OtherFormField";
import { icons, images } from "../../constants";
import Eachchat from "../../components/eachChat";
import MyMessages from "../../components/myMessages";
import {
  getAllPosts,
  getCurrentUser,
  getRoom,
  client,
  databases,
  config,
} from "../../lib/appwrite";
import { ID, Query, Permission, Role } from "react-native-appwrite";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import { useLocalSearchParams, Redirect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  uploadFile,
  createText,
  createChatAttachment,
} from "../../lib/appwrite";
import * as FileSystem from "expo-file-system";
//import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

const Messages = () => {
  const { currentUser, rooms, setRooms, isLoggedIn } = useGlobalContext();
  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  const [roomID, setRoomID] = useState("");
  const [chatID, setChatID] = useState("");
  const [pictures, setPictures] = useState([]);

  const params = useLocalSearchParams();
  const otherUser = JSON.parse(params.creator);

  const conbine = (numb1, numb2) => {
    if (numb1 > numb2) {
      return `${numb1}${numb2}`;
    } else {
      return `${numb2}${numb1}`;
    }
  };

  const uniqeID = conbine(otherUser.$id, currentUser.$id);

  const checkIfRoomExist = rooms.find((item) => item.chatID === uniqeID);

  return (
    <View className="flex-1">
      {pictures.length === 0 ? (
        <View></View>
      ) : (
        <View className="absolute w-full h-full z-20 justify-center">
          <View className="absolute w-full h-full z-20 bg-black opacity-80"></View>
          <TouchableOpacity
            onPress={() => setPictures([])}
            className="absolute z-50 top-0 right-0 m-4 justify-center items-center h-9 w-9"
          >
            <Image
              source={icons.plus}
              className="mr-1 rotate-45 w-7 "
              resizeMode="contain"
              tintColor={"#Ffffff"}
            />
          </TouchableOpacity>
          <View>
            <Carousel pictures={pictures} />
          </View>
        </View>
      )}

      <TypeField
        uniqeID={uniqeID}
        currentUser={currentUser}
        rooms={rooms}
        roomID={roomID}
        otherUser={otherUser}
        checkIfRoomExist={checkIfRoomExist}
      />
      <ChatContainer
        setRoomID={setRoomID}
        uniqeID={uniqeID}
        checkIfRoomExist={checkIfRoomExist}
        currentUser={currentUser}
        rooms={rooms}
        roomID={roomID}
        setRooms={setRooms}
        otherUser={otherUser}
        setChatID={setChatID}
        setPictures={setPictures}
      />
    </View>
  );
};

export default Messages;

const Carousel = ({ pictures }) => {
  // const screen = Dimensions.get("window").width - 200 / 1;

  const handleDownload = async (chatAttachmentt) => {
    // console.log("attachs", chatAttachmentt.name);
    const filename = chatAttachmentt.name;
    const imageUrl = { uri: chatAttachmentt.downloadLink };

    let fileUri = FileSystem.documentDirectory + `${chatAttachmentt.name}`;
    // console.log("fileuri", fileUri);
    try {
      const res = await FileSystem.downloadAsync(imageUrl.uri, fileUri);
      // console.log("result", res);
      saveFile(res.uri, filename, res.headers["content-type"]);
    } catch (err) {
      console.log("FS Err: ", err);
    }
  };

  const saveFile = async (uri, filename, mimetype) => {
    const albumName = "HomeHunt";
    // console.log(typeof albumName);
    if (Platform.OS === "android") {
      // const permissions =
      //   await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      const mediaLibraryPermissions =
        await MediaLibrary.requestPermissionsAsync();
      if (mediaLibraryPermissions.granted) {
        console.log("granted");
        try {
          const file = await MediaLibrary.createAssetAsync(uri);
          const folder = await MediaLibrary.getAlbumAsync(albumName);

          if (folder == null) {
            await MediaLibrary.createAlbumAsync(albumName, file, false);
            // console.log("created");
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([file], folder, false);
          }
        } catch (err) {
          console.log("Save err: ", err);
        }
      } else if (mediaLibraryPermissions === "denied") {
        alert("please allow permissions to download");
      }
    } else {
      shareAsync(uri);
    }

    try {
      const folder = await MediaLibrary.getAlbumAsync({ album: albumName });
      const fileExist = folder.folder.find((file) =>
        file.uri.includes(filename)
      );
      if (fileExist) {
        console.log("file exist");
      }

      // const files = StorageAccessFramework.getUriForDirectoryInRoot("HomeHunt");
      console.log("part", files);
    } catch (err) {
      console.log("Save err: ", err);
    }
  };

  return (
    <FlatList
      horizontal
      className=" z-30"
      data={pictures}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <View className="bg-black justify-end h-full ">
          <View className="flex-1 my-14 ">
            <Image
              resizeMode="contain"
              // className={`h-[100px] mx-10 w-80`}
              className="h-full  mx-10 w-80"
              source={{ uri: item.previewUrl }}
            />
          </View>
          <View className="flex-row h-[30px] mb-4 mx-4 justify-between items-center">
            <Text className="font-InSemiBold text-[12px] text-white">
              {item.name}
            </Text>
            <TouchableOpacity onPress={() => handleDownload(item)}>
              <Image
                resizeMode="contain"
                className="mr-[7px] w-[20px] z-20 h-[18px]"
                source={icons.downarrow}
                tintColor={"#Ffffff"}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const TypeField = ({
  currentUser,
  roomID,
  otherUser,
  checkIfRoomExist,
  uniqeID,
}) => {
  const [message, setMessage] = useState({ text: "" });
  const [attachment, setAttachment] = useState([]);
  const [fileToAttach, setFileToAttach] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messageProperties = {
    otherUser,
    uniqeID,
    message,
    currentUser,
    attachment,
  };

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      aspect: [4, 3],
      quality: 1,
    });

    const checkifpictureExist = attachment.find(
      (item) => item.fileName === result.assets[0].fileName
    );

    if (!result.canceled) {
      if (checkifpictureExist) {
      } else if (selectType === "videos") {
        setAttachment([...attachment, result.assets[0]]);
      } else if (selectType === "image") {
        setAttachment([...attachment, result.assets[0]]);
      }
    }
  };

  const removepicture = (clicked) => {
    const newattachment = attachment.filter(
      (item) => item.fileName !== clicked.fileName
    );

    setAttachment(newattachment);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!checkIfRoomExist) {
        const forCreator = await databases.createDocument(
          config.databaseId,
          config.roomCollectionId,
          ID.unique(),
          {
            receiverIdd: otherUser.$id,
            senderIdd: currentUser.$id,
            chatID: uniqeID,
            receiverId: otherUser.$id,
            lastMessage: message.text,
            senderId: currentUser.$id,
          }
          // [Permission.delete(Role.user(currentUser.$id))]
        );

        try {
          await createText({
            ...messageProperties,
          });
        } catch (error) {
          throw new Error(error);
        }

        setMessage("");
        setAttachment([]);
      } else {
        try {
          await createText({
            ...messageProperties,
          });
        } catch (error) {
          throw new Error();
        }
        // const now = new Date().toISOString();
        // const utcDate = new Date(utcTimeString);
        // const localTimeString = utcDate.toLocaleString();

        try {
          const updateCreatorRoom = async () => {
            if (checkIfRoomExist.receiverIdd?.$id == currentUser?.$id) {
              const updateCreatorRoom = await databases.updateDocument(
                config.databaseId,
                config.roomCollectionId,
                roomID,
                {
                  lastMessage: message.text,
                  isSeenS: false,
                }
              );
            } else {
              const updateCreatorRoom = await databases.updateDocument(
                config.databaseId,
                config.roomCollectionId,
                roomID,
                {
                  lastMessage: message.text,
                  isSeenR: false,
                }
              );
            }
          };

          // const updateCreatorRoom = await databases.updateDocument(
          //   config.databaseId,
          //   config.roomCollectionId,
          //   roomID,
          //   {
          //     lastMessage: message.text,
          //     // upDateAt: now,
          //   }
          // );
        } catch (error) {
          throw new Error();
        }

        setMessage("");
        setAttachment([]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="absolute pt-4 flex-1 z-10 pb-4 px-4  rounded-t-2xl max-h-[200px] bottom-0 w-full bg-white">
      {attachment.length === 0 ? (
        <View></View>
      ) : (
        <View className="h-[50px] mb-2 w-full flex-row ">
          {attachment.map((item) => {
            return (
              <View
                className="h-full w-[40px] mr-[20px] relative"
                key={item.fileSize}
              >
                <Image
                  source={{ uri: item.uri }}
                  // source={icons.file}
                  className="mr-1 w-10 h-full"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => removepicture(item)}
                  className="w-4 h-4 absolute -right-[5px] -top-[20px] "
                >
                  <Image
                    source={icons.plus}
                    className="rotate-45 w-4"
                    resizeMode="contain"
                    tintColor={"#FA7171"}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
      <View className="flex-1 flex-row">
        <TouchableOpacity
          onPress={() => openPicker("image")}
          className="h-[40px] w-[20px] justify-center items-center"
        >
          <Image
            className="h-[25px] w-[15px] object-cover"
            resizeMode="contain"
            source={icons.clip}
            tintColor={"#222"}
          />
        </TouchableOpacity>

        <View className="w-[75%] flex-1 justify-end  bg-[#F4F6F9] rounded-lg focus:border-primary px-4 mx-2">
          <TextInput
            className="text-gray-700 min-h-[40px]  font-InMedium text-base w-full"
            multiline={true}
            value={message.text}
            placeholder={"Type a message"}
            placeholderTextColor="#7b7b8d"
            onChangeText={(e) => {
              setMessage({ ...message, text: e });
            }}
          />
        </View>

        {message.text == "" ? (
          <TouchableOpacity
            // onPress={() => handleSubmit()}
            className="bg-primary h-[40px] rounded-lg justify-center items-center w-[40px]"
          >
            <Image
              source={icons.mic}
              className="h-[25px] w-[25px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleSubmit()}
            className={`bg-primary h-[40px] rounded-lg justify-center items-center w-[40px] ${
              isSubmitting ? "opacity-50" : ""
            } `}
            disabled={isSubmitting}
            activeOpacity={0.7}
          >
            <Image
              source={icons.send}
              className="h-[25px] w-[25px]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

//The whole chats
const ChatContainer = ({
  uniqeID,
  currentUser,
  setRooms,
  setRoomID,
  setChatID,
  checkIfRoomExist,
  setPictures,
  roomID,
}) => {
  const [chat, setChat] = useState([]);
  useEffect(() => {
    getChats();
    getRoom();
    checkRoom();

    const unSubed = client.subscribe(
      `databases.${config.databaseId}.collections.${config.chatsCollectionId}.documents`,

      (response) => {
        // console.log(response);
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          ) &&
          response.payload.chatID === uniqeID &&
          response.payload.senderId !== currentUser.$id && // Prevent own message duplicate
          !chat.some((msg) => msg.$id === response.payload.$id) // Prevent existing message duplicate
        ) {
          setChat((prevState) => [response.payload, ...prevState]);
          console.log("A MESSAGE WAS created!!!");
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          console.log("A MESSAGE WAS updated!!!");
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A MESSAGE WAS DELETED!!!");
        }
      }
    );

    return () => {
      unSubed();
    };
  }, [uniqeID, currentUser.$id, chat]);

  //fetching each chats sent
  const getChats = async () => {
    const res = await databases.listDocuments(
      config.databaseId,
      config.chatsCollectionId,

      [Query.equal("chatID", uniqeID), Query.orderDesc("$createdAt")]
    );

    setChat(res.documents);
  };

  const getRoom = async () => {
    const resp = await databases.listDocuments(
      config.databaseId,
      config.roomCollectionId,
      [
        Query.or([
          Query.equal("senderId", currentUser.$id),
          Query.equal("receiverId", currentUser.$id),
        ]),
      ]
    );

    setRooms(resp.documents);
  };

  const checkRoom = () => {
    if (checkIfRoomExist) {
      setRoomID(checkIfRoomExist.$id);
      setChatID(checkIfRoomExist.chatID);
    } else {
      setRoomID("");
      setChatID(uniqeID);
    }
  };

  // const updateIsSeen = async () => {
  //   if (checkIfRoomExist.receiverIdd.$id == currentUser.$id) {
  //     const updateCreatorRoom = await databases.updateDocument(
  //       config.databaseId,
  //       config.roomCollectionId,
  //       roomID,
  //       {
  //         isSeenR: true,
  //       }
  //     );
  //   } else {
  //     const updateCreatorRoom = await databases.updateDocument(
  //       config.databaseId,
  //       config.roomCollectionId,
  //       roomID,
  //       {
  //         isSeenS: true,
  //       }
  //     );
  //   }
  // };

  // console.log(checkIfRoomExist.receiverIdd.$id);
  return (
    <FlatList
      inverted={true}
      data={chat}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Eachchat data={item} setPictures={setPictures} />
      )}
      className="px-4  mb-[80px]"
    />
  );
};
