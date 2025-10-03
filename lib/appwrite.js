import {
  Account,
  Client,
  Databases,
  Avatars,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

import { Alert } from "react-native";
import { useGlobalContext } from "../context/GlobalContextProvider";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.wedesign.homehunt",
  projectId: "66f3b15a00107063cd28",
  databaseId: "66f3b7450036525a64eb",
  usersCollectionId: "66f66e9a00131b7b6cbe",
  agentsCollectionId: "66f3b80a003014b596b6",
  buyCollectionId: "66f6729f0018567920a9",
  roomCollectionId: "674348b900376bf9191c",
  chatsCollectionId: "67487f3e0021d5ce89b3",
  chatAttachmentId: "67eb97ea002c22eb22f1",
  storageId: "66f3bb500012f907d26c",
};

// Init your React Native SDK
export const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      {
        email: email,
        username: username,
        accountId: newAccount.$id,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.buyCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.buyCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateFav = async (newFavs, currentUser) => {
  try {
    const property = await databases.updateDocument(
      config.databaseId,
      config.usersCollectionId,
      currentUser.$id,
      { favorites: newFavs }
    );

    return property;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchFav = async (ids) => {
  // console.log("appwrite", ids);
  try {
    let allFav = [];

    for (let i = 0; i < ids.length; i++) {
      const property = await databases.listDocuments(
        config.databaseId,
        config.buyCollectionId,
        [Query.equal("$id", ids[i])]
      );
      allFav.push(property.documents[0]);
    }
    // console.log("appwritefavsproperties", allFav);
    // console.log("appwritefavspropertiesdirect", property.documents);

    return allFav;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPropertyByID = async (ids) => {
  // console.log(ids);
  try {
    const property = await databases.listDocuments(
      config.databaseId,
      config.buyCollectionId,
      [Query.equal("creator", ids)]
    );

    return property.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const endUser = async () => {
  try {
    const endSession = await account.deleteSession("current");
    return endSession;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.buyCollectionId,
      [
        Query.or([
          Query.search("title", query),
          Query.search("street", query),
          Query.search("state", query),
        ]),
      ]
      // [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserInfo = async (userUpdatedInformation, currentUser) => {
  const [coverUrl, pictureUrl] = await Promise.all([
    uploadFile(userUpdatedInformation.cover, "image"),
    uploadFile(userUpdatedInformation.picture, "image"),
  ]);

  const pictureUrlString = pictureUrl[0];
  const coverUrlString = coverUrl[0];

  try {
    const posts = await databases.updateDocument(
      config.databaseId,
      config.usersCollectionId,
      currentUser.$id,
      {
        username: userUpdatedInformation.username,
        phoneNumber: userUpdatedInformation.phoneNumber,
        email: userUpdatedInformation.email,
        street: userUpdatedInformation.street,
        state: userUpdatedInformation.state,
        country: userUpdatedInformation.country,
        lga: userUpdatedInformation.lga,
        aboutMe: userUpdatedInformation.aboutMe,
        city: userUpdatedInformation.city,
        coverPicture: coverUrlString,
        profilePicture: pictureUrlString,
      }
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrlPreview;
  try {
    fileUrlPreview = `https://cloud.appwrite.io/v1/storage/buckets/${config.storageId}/files/${fileId}/view?project=${config.projectId}`;

    // fileUrlPreview = storage.getFilePreview(
    //   config.storageId,
    //   fileId,
    //   2000,
    //   2000,
    //   "top",
    //   100
    // );

    if (!fileUrlPreview) throw Error;

    return fileUrlPreview;
  } catch (error) {
    throw new Error(error);
  }
};

//

export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = file.map((filee) => ({
    name: filee.fileName,
    type: filee.mimeType,
    size: filee.fileSize,
    uri: filee.uri,
  }));

  try {
    //
    let createdLoops = [];

    for (let i = 0; i < asset.length; i++) {
      const uploadedpictures = await storage.createFile(
        config.storageId,
        ID.unique(),
        asset[i]
      );

      createdLoops.push(uploadedpictures);
      // console.log("createdLoops", createdLoops);
    }

    let fileUrl = [];

    for (let i = 0; i < createdLoops.length; i++) {
      const loopURI = await getFilePreview(createdLoops[i].$id, type);
      fileUrl.push(loopURI);
    }

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

//

export const createProperty = async (propertyInfo, currentUser) => {
  try {
    const [coverUrl, picturesUrl] = await Promise.all([
      uploadFile(propertyInfo.cover, "image"),
      uploadFile(propertyInfo.pictures, "image"),
    ]);

    if (coverUrl.length === 0 || picturesUrl.length === 0) {
      Alert.alert(
        "Your cover picture failed to upload, kindly choose another pictuer"
      );
    } else {
      const newProperty = await databases.createDocument(
        config.databaseId,
        config.buyCollectionId,
        ID.unique(),
        {
          owner: currentUser.$id,
          adType: propertyInfo.adType,
          title: propertyInfo.title,
          beds: propertyInfo.beds,
          bath: propertyInfo.baths,
          coverpicture: coverUrl,
          pictures: picturesUrl,
          street: propertyInfo.street,
          state: propertyInfo.state,
          country: propertyInfo.country,
          lga: propertyInfo.lga,
          amount: propertyInfo.amount,
          houseRules: propertyInfo.houseRules,
          desc: propertyInfo.description,
          sqrt: propertyInfo.size,
        }
      );

      return newProperty;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const createText = async (messageProperties) => {
  try {
    const [attach] = await Promise.all([
      createChatAttachment(messageProperties, "image"),
    ]);

    const assetsIds = attach.map((data) => data.$id);

    // console.log("ids", assetsIds);

    const sendText = await databases.createDocument(
      config.databaseId,
      config.chatsCollectionId,
      ID.unique(),
      {
        senderIDD: messageProperties.currentUser.$id,
        chatID: messageProperties.uniqeID,
        // senderID: messageProperties.currentUser.$id,
        body: messageProperties.message.text,
        receiverIDD: messageProperties.otherUser.$id,
        chatAttachment: assetsIds,
      }
    );

    return sendText;
  } catch (error) {
    throw new Error(error);
  }
};

///
export const getFileDownload = async (fileId) => {
  let fileDownloadUrl;
  try {
    fileDownloadUrl = storage.getFileDownload(config.storageId, fileId);
    if (!fileDownloadUrl) throw Error;

    return fileDownloadUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFileMeta = async (fileId) => {
  let fileMeta;
  try {
    fileMeta = storage.getFile(config.storageId, fileId);
    if (!fileMeta) throw Error;
    // console.log("fileMeta", fileMeta);
    return fileMeta;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadDownload = async (file, type) => {
  if (!file) return;

  const asset = file.map((filee) => ({
    name: filee.fileName,
    type: filee.mimeType,
    size: filee.fileSize,
    uri: filee.uri,
  }));

  try {
    //
    let createdLoops = [];

    for (let i = 0; i < asset.length; i++) {
      const uploadedpictures = await storage.createFile(
        config.storageId,
        ID.unique(),
        asset[i]
      );

      createdLoops.push(uploadedpictures);
    }

    let filePreviewUrl = [];
    let fileDownloadUrl = [];
    let fileMeta = [];

    for (let i = 0; i < createdLoops.length; i++) {
      const loopURI = await getFilePreview(createdLoops[i].$id, type);
      const loopDownload = await getFileDownload(createdLoops[i].$id);
      const loopMeta = await getFileMeta(createdLoops[i].$id);

      filePreviewUrl.push(loopURI);
      fileDownloadUrl.push(loopDownload);
      fileMeta.push(loopMeta);
    }

    let metadata = filePreviewUrl.map((preview, index) => ({
      preview: preview,
      downloadLink: fileDownloadUrl[index],
      meta: fileMeta[index],
    }));
    console.log("fileMeta", fileMeta);
    return metadata;
  } catch (error) {
    throw new Error(error);
  }
};

export const createChatAttachment = async (messageProperties) => {
  const [resp] = await Promise.all([
    uploadDownload(messageProperties.attachment, "image"),
  ]);

  if (!resp) return;

  const asset = resp.map((data) => ({
    downloadLink: data.downloadLink,
    previewUrl: data.preview,
    // metaData: [{ name: data.meta.name, sizeOriginal: data.meta.sizeOriginal }],
    name: data.meta.name,
    size: data.meta.sizeOriginal,
  }));

  try {
    //
    let createdLoops = [];

    for (let i = 0; i < asset.length; i++) {
      const sendData = await databases.createDocument(
        config.databaseId,
        config.chatAttachmentId,
        ID.unique(),
        asset[i]
      );

      createdLoops.push(sendData);
    }

    return createdLoops;
  } catch (error) {
    throw new Error(error);
  }
};
