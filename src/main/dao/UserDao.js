import firebase from "../../config/firebase";

const db = firebase.firestore();

export function getAdmin(userId) {
   return db.collection("admins").where("userId", "==", userId);
}

