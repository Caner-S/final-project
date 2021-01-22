import firebase from "../../config/firebase";

const db = firebase.firestore();

export async function getBookingsByUserID(userId) {
    let bookings = [];
    await db.collection("bookings").where("userId", "==", userId).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
                bookings.push(doc)
        });
    })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    return bookings;

}

export async function getAllBookings() {
    let bookings = [];
    await db.collection("bookings").orderBy('userId').get().then(function (querySnapshot) {
        querySnapshot.forEach(function(doc) {
            bookings.push(doc)
        });
    })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    return bookings;
}

export async function getAvailableSpaces(startTime, endTime, today) {
    let bookingIDs = [];
    let availableSpaces = [];

    const startTimeToday =  new Date(today).valueOf();
    const startTimeDate =  new Date(startTime).valueOf();
    const endTimeDate =  new Date(endTime).valueOf();

   // if (startTime < "departureDate" && endTime > "arrivalDate")  {

    const resArrival = await db.collection("bookings").where("departureDate", ">", startTimeDate).where("departureDate", "<", startTimeToday)
        .get();
    resArrival.forEach(doc => {
        if(endTimeDate > doc.data().arrivalDate){
            bookingIDs.push(doc.data().spaceId);
        }

    })


   await db.collection("spaces").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(!bookingIDs.includes(doc.id)) {
                    availableSpaces.push(doc)
                    //console.log(doc.id);
                }
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

   return availableSpaces
}

export function makeBooking(spaceId, userId, arrivalDate, departureDate) {
    return db.collection('bookings').add({
        spaceId: spaceId,
        userId:  userId,
        arrivalDate: new Date(arrivalDate).valueOf(),
        departureDate: new Date(departureDate).valueOf()
    });
}

export function deleteBooking(bookingId) {
    return  db.collection("bookings").doc(bookingId).delete();
}
