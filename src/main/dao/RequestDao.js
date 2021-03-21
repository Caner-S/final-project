import firebase from "../../config/firebase";

const db = firebase.firestore();

export function makeRequest(spaceId, userId, arrivalDate, departureDate, businessCase, status) {
    console.log(arrivalDate);
    console.log(new Date(arrivalDate).valueOf());
    return db.collection('requests').add({
        spaceId: spaceId,
        userId:  userId,
        arrivalDate: new Date(arrivalDate).valueOf(),
        departureDate: new Date(departureDate).valueOf(),
        businessCase: businessCase,
        status: status,
    });
}

export function getRequestByUserId(userId) {

    return db.collection("requests").where("userId", "==", userId).get();


}

export async function getAllRequests() {
    let requests = [];
    await db.collection("requests").orderBy('userId').onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function(doc) {
            requests.push(doc)
        });
    })


    return requests;
}

export async function getAllPendingRequests() {

    return db.collection("requests").where("status", "==", "Pending").get();


}

export function deleteRequest(requestId) {
    return  db.collection("requests").doc(requestId).delete();
}

export function updateStatus(id, status){
    return db.collection("requests").doc(id).update({status: status});
}