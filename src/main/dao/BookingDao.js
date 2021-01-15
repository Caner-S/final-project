import firebase from "../../config/firebase";

const db = firebase.firestore();

export function getBookingsByUserID(userId) {
    return db.collection("bookings").doc(userId);
}

export function getAllBookings() {
    return db.collection("bookings").orderBy('userId');
}

export function getUnavailableBookings(startTime, endTime) {
    let bookingIDs = [];
    const startTimeDate =  new Date(startTime).valueOf();
    const endTimeDate =  new Date(endTime).valueOf();
    db.collection("bookings").where("arrivalDate", ">=", startTimeDate).where("arrivalDate", "<", endTimeDate)
        .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                bookingIDs.push((doc.id).toString());
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    db.collection("bookings").where("departureDate", ">", startTimeDate).where("departureDate", "<=", endTimeDate)
        .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                bookingIDs.push((doc.id).toString());
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    bookingIDs.push("test");
    bookingIDs.push("test");
    console.log(bookingIDs);
    const unique = [...new Set(bookingIDs)];
    console.log(unique);
    return bookingIDs;
}

export function makeBooking(spaceId, userId, arrivalDate, departureDate) {
    return db.collection('bookings').add({
        spaceId: spaceId,
        userId:  userId,
        arrivalDate: new Date(arrivalDate).valueOf(),
        departureDate: new Date(departureDate).valueOf()
    });
}

export function deleteBooking() {
    return db.collection("bookings").orderBy('userId');
}
