import React from 'react';
import {deleteBooking, getAllBookings} from "../dao/BookingDao";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import {confirmationBox} from "./ConfirmationBox";
import "./Spaces.css";

class AllBookings extends React.Component {
    constructor() {
        super();
        this.state = {
            bookings: [],
            open: false,
            id: 'test',
        };
    }

    componentDidMount() {

        this.getBookings();

    }

    async getBookings() {
        this.setState({bookings: await getAllBookings()});
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
                                <TableCell align="right">Space&nbsp;Id</TableCell>
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
                                    <TableCell align="right">{booking.data().spaceId}</TableCell>
                                    <TableCell align="right">{new Date(booking.data().arrivalDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">{new Date(booking.data().departureDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary" onClick={() => confirmationBox(booking.id,'Are you sure you want to cancel booking ' + booking.id + '?',() => deleteBooking(booking.id))}>
                                            Cancel Booking
                                        </Button>

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