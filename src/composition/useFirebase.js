import firebase from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/compat/firestore";
import { ref, onUnmounted } from "vue";
// import  {config}  from './../config'

const firebaseConfig = {
  apiKey: "",
  authDomain: ".firebaseapp.com",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const locksRaw = firestore.collection("locks");
const locksCollection = firestore
  .collection("locks")
  .orderBy("createdAt", "desc");

export function useFirebase(_userId, _address) {
  const locks = ref([]);
  const auth = getAuth();
  console.log(auth);
  const unsubscribe = locksCollection
    .where("userId", "==", _userId)
    .onSnapshot((snapshot) => {
      locks.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
  onUnmounted(unsubscribe);

  const addLock = async (_message) => {
    console.log("About to lock", _userId, _address, _message);
    let response = await locksRaw.add({
      userId: _userId,
      address: _address,
      message: _message,
      txID: "",
      pubkey: "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return response;
  };

  return { locks, addLock };
}

export function useAuth() {
  const register = async (_email, _password, _name) => {
    console.log(_email, _password, _name);
    const auth = getAuth();
    let response = await createUserWithEmailAndPassword(
      auth,
      _email,
      _password
    );
    console.log("User:", response.user, "Error:", response.error);
    return response;
  };

  const signIn = async (email, password) => {
    console.log(email, password);
    let response;
    const auth = getAuth();
    response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  };

  return { register, signIn };
}
