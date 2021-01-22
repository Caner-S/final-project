import firebase from "../../config/firebase";

const db = firebase.firestore();

export function getSpaceByID(spaceId) {
    return db.collection("spaces").doc(spaceId);
}

export function getAllSpaces() {
    return db.collection("spaces").orderBy('number');
}

export function getFreeSpaces() {
    return db.collection("spaces").orderBy('number');
}

export function addSpace(number, capacity, type, exclusive, section, floor) {
    return db.collection('spaces').add({
        number: number,
        capacity:  capacity,
        type: type,
        exclusive: exclusive,
        section: section,
        floor: floor
    });
}

export function deleteSpace() {
    return db.collection("spaces").orderBy('number');
}