import firebase from "../../config/firebase";

const db = firebase.firestore();

export function getSiteInformation() {
    return db.collection("information").doc("dibs");

}

export function updateSiteInformation(businessCase) {
    return db.collection("information").doc("dibs").update({businessCase: businessCase});

}