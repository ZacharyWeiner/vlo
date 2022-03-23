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
  apiKey: "AIzaSyBmsWrILQoPrACmKJJq22lOnuWUXdvo28Q",
  authDomain: "vx-corp-demo.firebaseapp.com",
  projectId: "vx-corp-demo",
  storageBucket: "vx-corp-demo.appspot.com",
  messagingSenderId: "986869729116",
  appId: "1:986869729116:web:88ba63abe702ec68082399",
  measurementId: "G-S0Y78RNGCD",
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const locksCollection = firestore.collection("locks");

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
    let response = await locksCollection.add({
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
    const auth = getAuth();
    let response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
    return response;
  };

  return { register, signIn };
}
