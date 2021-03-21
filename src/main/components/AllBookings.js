import React from 'react';
import {deleteBooking, getAllBookings} from "../dao/BookingDao";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import "./MyBookings.css";
import Confirm from "./Confirm";

class AllBookings extends React.Component {
    constructor() {
        super();
        this.state = {
            bookings: [],
        };
    }

    componentDidMount() {
        let currentComponent = this;
        getAllBookings().then((snapshot) => {
            let updatedData = snapshot.docs.map(doc => doc)
            currentComponent.setState({ bookings: updatedData });

        })


    }

    cancelBooking(id){
        this.setState({bookings: this.state.bookings.filter(item => item.id !== id)});
        deleteBooking(id);
    }



    render() {
        let {bookings} = this.state;
        return (
            <div className="BookingsBorder">
                <TableContainer component={Paper} className="container">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User&nbsp;Id</TableCell>
                                <TableCell align="right">Space&nbsp;Number</TableCell>
                                <TableCell align="right">Arrival Time</TableCell>
                                <TableCell align="right">Departure Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map(booking => (
                                <TableRow key={booking.id} >
                                    <TableCell component="th" scope="row">
                                        {booking.data().userId}
                                    </TableCell>
                                    <TableCell align="right">{booking.data().seatNumber}</TableCell>
                                    <TableCell align="right">{new Date(booking.data().arrivalDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">{new Date(booking.data().departureDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">
                                        <Confirm buttonText="Cancel Booking" title={"Cancel a booking"} description={"Are you sure you want to cancel booking "+booking.data().id+"?"} onAccept={() => { this.cancelBooking(booking.id)}} />

                                    </TableCell>
                                </TableRow>


                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
export default AllBookings;