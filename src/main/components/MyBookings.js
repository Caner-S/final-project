import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {deleteBooking, getBookingsByUserID} from "../dao/BookingDao";
import firebase from "../../config/firebase";
import "./MyBookings.css";
import Confirm from "./Confirm";


class MyBookings extends React.Component {

    constructor() {
        super();
        this.state = {
            spaces: [],
            bookings: [],
            open: false,
            id: 'test',
        };
    }

    componentDidMount() {

        this.getBookingsAndSpaces();

    }

    async getBookingsAndSpaces() {
        this.setState({bookings: await getBookingsByUserID(firebase.auth().currentUser.uid)});
    }


    render() {
        let {bookings} = this.state;
        return (
            <div className="BookingsBorder">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Seat&nbsp;Number</TableCell>
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Section</TableCell>
                                <TableCell align="right">Floor</TableCell>
                                <TableCell align="right">Arrival Time</TableCell>
                                <TableCell align="right">Departure Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map(booking => (
                                <TableRow key={booking.id} >
                                    <TableCell component="th" scope="row">
                                        {booking.id}
                                    </TableCell>
                                    <TableCell align="right">test</TableCell>
                                    <TableCell align="right">test</TableCell>
                                    <TableCell align="right">test</TableCell>
                                    <TableCell align="right">{new Date(booking.data().arrivalDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">{new Date(booking.data().departureDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">
                                        <Confirm buttonText="Cancel Booking" title={"Cancel a booking"} description={"lol"} onAccept={() => { deleteBooking(booking.id)}} />

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
export default MyBookings;