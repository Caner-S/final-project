import React from 'react';
import { getUnavailableBookings} from "../dao/BookingDao";

class Stats extends React.Component {
    constructor() {
        super();
        let today = new Date().toISOString().slice(0, 10);
        this.state = {
            bookings: [],
            todayISO: today+"T23:59",
            arrivalDate: today+"T09:00",
            departureDate: today+"T17:00",
        };
    }

    componentDidMount() {
        let currentComponent = this;
        getUnavailableBookings(this.state.arrivalDate, this.state.departureDate, this.state.todayISO).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let updatedData = querySnapshot.docs.map(doc => doc)
                currentComponent.setState({ bookings: updatedData })

            })

        })

    }



    render() {
        return (
            <div>
            <h1>Stats</h1>
            <h2>Total Bookings Today</h2>
                <h1>{((this.state.bookings.length/209)*100).toFixed(2)}%</h1>
                <h2>Area Breakdown</h2>
            </div>
        );
    }
}
export default Stats;