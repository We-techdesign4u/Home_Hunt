import {
  Account,
  Client,
  Databases,
  Avatars,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https:/cloud.appwrite.io/v1",
  platform: "com.wedesign.homehunt",
  projectId: "66f3b15a00107063cd28",
  databaseId: "66f3b7450036525a64eb",
  usersCollectionId: "66f66e9a00131b7b6cbe",
  agentsCollectionId: "66f3b80a003014b596b6",
  storageId: "66f3bb500012f907d26c",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// export const createUser = () => {
//   // Register User
//   account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
//     function (response) {
//       console.log(response);
//     },
//     function (error) {
//       console.log(error);
//     }
//   );
// };

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
