import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    makeBooking
} from "../dao/BookingDao";
import firebase from "../../config/firebase";
import './Spaces.css';
import Confirm from "./Confirm";
import ConfirmInput from "./ConfirmInput";


class Spaces extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
        };

    }


    fillBox (space)  {
        const a = document.getElementById("svg");
        const svgDoc = a.contentDocument;
        const elements = svgDoc.getElementsByClassName(space.toString());
        if(typeof elements[0] !== "undefined"){
            elements[0].style.fill = 'orange';
            setTimeout(function(){
                elements[0].style.fill = 'green';
            }, 2000);
        } else {
            alert("Space not found");
        }
    }






    handleChangePage = (newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (rowsPerPage) => {
        this.setState({page: 0, rowsPerPage: rowsPerPage});
    };

    businessCase(space){
        if(this.props.businessCase){
            console.log(this.props.arrivalDate);
            return <ConfirmInput buttonText="Request Now" title={"Request a space"} description={"Are you sure you want to make a request for space "+space.data().number+" at "+ new Date(this.props.arrivalDate).toLocaleString() +"?"} spaceId={space.id} user={firebase.auth().currentUser.uid} arrive={this.props.arrivalDate} depart={this.props.departureDate}/>
        } else {
            return <Confirm buttonText="Book Now" title={"Book a space"} description={"Are you sure you want to make a booking for space "+space.data().number+" at "+ new Date(this.props.arrivalDate).toLocaleString() +"?"} onAccept={() => { makeBooking(space.id, firebase.auth().currentUser.uid, this.props.arrivalDate, this.props.departureDate, space.data().number)}} />

        }
    }




    render() {
        return (
            <div className="border" >


            <TableContainer component={Paper} className="container">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Seat&nbsp;Number</TableCell>
                            <TableCell align="right">Capacity</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Floor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
            {this.props.spaces.map(space => (
                <TableRow key={space.data().number}  >

                    <TableCell component="th" scope="row" onClick={() => this.fillBox(space.data().number)}>
                        {space.data().number}
                    </TableCell>
                    <TableCell align="right" onClick={() => this.fillBox(space.data().number)}>{space.data().capacity}</TableCell>
                    <TableCell align="right" onClick={() => this.fillBox(space.data().number)}>{space.data().type}</TableCell>
                    <TableCell align="right" onClick={() => this.fillBox(space.data().number)}>{space.data().floor}</TableCell>

                    <TableCell align="right">
                        {this.businessCase(space)}
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
export default Spaces;