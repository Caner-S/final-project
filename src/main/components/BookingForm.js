import React from 'react';
import firebase from "../../config/firebase";
import {makeBooking, getAvailableSpaces} from "../dao/BookingDao";
import TextField from '@material-ui/core/TextField';


class BookingForm extends React.Component {
    constructor() {
        super();
        this.state = {
            spaceId: null,
            userId: null,
            arrivalDate: null,
            departureDate: null,
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    makeBooking = e => {
        e.preventDefault();
        makeBooking(this.state.spaceId, this.state.userId, this.state.arrivalDate, this.state.departureDate);
        //getAvailableSpaces(this.state.arrivalDate, this.state.departureDate);

    };


    render() {
        return (
            <div>
            <h4>Make a Booking</h4>
            <form onSubmit={this.makeBooking}>
                <input
                    type="text"
                    name="spaceId"
                    placeholder="SpaceForm id"
                    onChange={this.updateInput}
                    value={this.state.spaceId}
                />
                <input
                    type="text"
                    name="userId"
                    placeholder="User Id"
                    onChange={this.updateInput}
                    value={this.state.userId}
                />
                <TextField
                    id="datetime-local"
                    name="arrivalDate"
                    label="Arrival Date"
                    type="datetime-local"
                    onChange={this.updateInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="datetime-local"
                    name="departureDate"
                    label="Departure Date"
                    type="datetime-local"
                    onChange={this.updateInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <button type="submit">Submit</button>
            </form>

            </div>
        );
    }
}
export default BookingForm;