import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    makeBooking
} from "../dao/BookingDao";
import firebase from "../../config/firebase";
import Confirm from "./Confirm";
import ConfirmInput from "./ConfirmInput";
import Typography from "@material-ui/core/Typography";
import './SingleBooking.css';


class SingleBooking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    businessCase(space){
        if(this.props.businessCase){
            console.log(this.props.arrivalDate);
            return <ConfirmInput buttonText="Request Now" title={"Request a space"} description={"Are you sure you want to make a request for space "+space.data().number+" at "+ new Date(this.props.arrivalDate).toLocaleString() +"?"} spaceId={space.id} user={firebase.auth().currentUser.uid} arrive={this.props.arrivalDate} depart={this.props.departureDate}/>
        } else {
            return <Confirm buttonText="Book Now" title={"Book a space"} description={"Are you sure you want to make a booking for space "+space.data().number+" at "+ new Date(this.props.arrivalDate).toLocaleString() +"?"} onAccept={() => { makeBooking(space.id, firebase.auth().currentUser.uid, this.props.arrivalDate, this.props.departureDate, space.data().number)}} />

        }
    }


    render() {
        let {space} = this.props;
        if(space === undefined){
            return (
            <Paper className="singleBookingPaper">
                <Typography variant="h3">Please select a space on the left</Typography>
            </Paper>);

        }else {

        return (
            <Paper className="singleBookingPaper">
               <Typography variant="h3">Space: {space.data().number}</Typography>
                <Typography variant="subtitle1">{new Date(this.props.arrivalDate).toLocaleString()} to {new Date(this.props.departureDate).toLocaleString()}</Typography>
                <Typography variant="subtitle1">Type: {space.data().type}</Typography>
                <Typography variant="subtitle1">Capacity: {space.data().capacity}</Typography>
                {this.businessCase(space)}
            </Paper>




        );}
    }
}
export default SingleBooking;