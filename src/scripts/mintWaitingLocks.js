/* eslint-disable no-unused-vars */
let fs = require("fs");
let path = require("path");
var admin = require("firebase-admin");
var serviceAccount = require(__dirname + "/firebaseScriptConfig.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const locksRef = db.collection("locks");
async function getLocks() {
  let locks = [];
  const snapshot = await locksRef.get();
  snapshot.forEach((doc) => {
    locks.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  return { locks };
}

const createWaitingLocks = async () => {
  let toLock = await getLocks();
  console.log(toLock);
};

createWaitingLocks();
