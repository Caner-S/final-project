import firebase from "../../config/firebase";

const db = firebase.firestore();

export const getBookingsByUserID = (userId) => {
    return db.collection("bookings").where("userId", "==", userId);
}


export const getAllBookings = () => {
    return new Promise((resolve, reject) => {
        db.collection("bookings").orderBy('userId')
            .onSnapshot((snapshot) => {

                let updatedData = snapshot.docs.map(doc => doc)
                resolve(updatedData)
            }, reject)
    })
}


export const getUnavailableBookings = (startTime, endTime, today) => {
    const startTimeToday = new Date(today).valueOf();
    const startTimeDate = new Date(startTime).valueOf();

    return db.collection("bookings").where("departureDate", ">", startTimeDate).where("departureDate", "<", startTimeToday);


}

export const getAvailableSpaces = (bookingIds, callback) => {
    let availableSpaces = [];
    db.collection("spaces").orderBy("number").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(!bookingIds.includes(doc.id)) {
                    availableSpaces.push(doc)
                }
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

   callback(availableSpaces);
}

export function makeBooking(spaceId, userId, arrivalDate, departureDate, seatNumber) {
    return db.collection('bookings').add({
        spaceId: spaceId,
        userId:  userId,
        arrivalDate: new Date(arrivalDate).valueOf(),
        departureDate: new Date(departureDate).valueOf(),
        seatNumber: seatNumber,
    });
}

export function deleteBooking(bookingId) {
    return  db.collection("bookings").doc(bookingId).delete();
}
