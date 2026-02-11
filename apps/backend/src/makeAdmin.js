// to run only one time using node filename
// better to run outside src like this node src/filename ot access/load .env file as well

import admin from "./firebase.js";

const makeAdmin = async (uid) => {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log("User is now admin");
};

makeAdmin("paste admin UID here");
