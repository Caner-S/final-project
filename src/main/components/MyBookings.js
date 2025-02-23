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
import AddToCalendar from 'react-add-to-calendar';
import Button from "@material-ui/core/Button";


class MyBookings extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            open: false,
            id: 'test',
        };

    }



    componentDidMount(){
        let currentComponent = this;
        if(firebase.auth().currentUser){
        getBookingsByUserID(firebase.auth().currentUser.uid).then((snapshot) => {
            console.log('onSnapshot Called!')
            let updatedData = snapshot.docs.map(doc => doc)
            currentComponent.setState({ bookings: updatedData });

        })}
    }

    cancelBooking(id){
        this.setState({bookings: this.state.bookings.filter(item => item.id !== id)});
        deleteBooking(id);
    }



    render() {
        let {bookings} = this.state;
        return (
            <div className="BookingsBorder">
                <h4>My Bookings</h4>
                <TableContainer component={Paper} className="container">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Seat&nbsp;Number</TableCell>
                                <TableCell align="right">Arrival Time</TableCell>
                                <TableCell align="right">Departure Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map(booking => (
                                <TableRow key={booking.id} >
                                    <TableCell component="th" scope="row">
                                        {booking.data().seatNumber}
                                    </TableCell>
                                    <TableCell align="right">{new Date(booking.data().arrivalDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">{new Date(booking.data().departureDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" color="primary">
                                        <AddToCalendar event={{
                                            title: 'Space Booking '+booking.data().seatNumber,
                                            description: 'The following is a booking for space ' +booking.data().seatNumber+ ' on Floor 6 in the Holborn Office.',
                                            location: 'Space '+ booking.data().seatNumber +', Floor 6, Holborn Office',
                                            startTime: booking.data().arrivalDate,
                                            endTime: booking.data().departureDate
                                        }} /></Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Confirm buttonText="Cancel Booking" title={"Cancel a booking"} description={"Are you sure you want to cancel your booking for space "+booking.data().seatNumber+" at "+ new Date(booking.data().arrivalDate).toLocaleString() +"?"} onAccept={() => { this.cancelBooking(booking.id)}} />

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