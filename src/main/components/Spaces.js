import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {getAvailableSpaces, makeBooking} from "../dao/BookingDao";
import TextField from "@material-ui/core/TextField";
import firebase from "../../config/firebase";
import {confirmationBox} from "./ConfirmationBox";
import './Spaces.css';
import TablePagination from "@material-ui/core/TablePagination";
import Admin from "./Admin";


class Spaces extends React.Component {

    constructor() {
        super();
        let today = new Date().toISOString().slice(0, 10);
        this.state = {
            spaces: [],
            todayISO: today+"T23:59",
            arrivalDate: today+"T09:00",
            departureDate: today+"T17:00",
            page: 0,
            rowsPerPage: 10,
        };
    }

    componentDidMount() {

       this.getSpaces();

    }

    async getSpaces() {
            this.setState({spaces: await getAvailableSpaces(this.state.arrivalDate, this.state.departureDate, this.state.todayISO)});
    }

    updateDeparture = e => {
        const arrivalDay = this.state.arrivalDate.substring(8, 10);
        const departureDate = e.target.value.substring(8, 10);
        if(arrivalDay === departureDate) {
            this.setState({
                [e.target.name]: e.target.value
            });
            this.getSpaces();

        }else {
            alert("Arrival and departure must be on the same day.");

        }
    }

    updateArrival = e => {
            this.setState({
                [e.target.name]: e.target.value,
                departureDate: e.target.value,
            });
            this.getSpaces();
    }

    fillBox (space)  {
            const a = document.getElementById("svg");
            const svgDoc = a.contentDocument;
            const elements = svgDoc.getElementsByClassName(space.toString());
            if(typeof elements[0] !== "undefined"){
                console.log(elements[0]);
            elements[0].style.fill = 'red';
            console.log(elements[0]);
            setTimeout(function(){
                elements[0].style.fill = 'none';
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



    render() {
        let {spaces} = this.state;
        return (
            <div className="border" >
                <form >
                    <TextField
                        id="datetime-local"
                        name="arrivalDate"
                        label="Arrival Date"
                        type="datetime-local"
                        onChange={this.updateArrival}
                        value={this.state.arrivalDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="datetime-local"
                        name="departureDate"
                        label="Departure Date"
                        type="datetime-local"
                        onChange={this.updateDeparture}
                        value={this.state.departureDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>

            <TableContainer component={Paper} className="container">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Seat&nbsp;Number</TableCell>
                            <TableCell>Seat&nbsp;Number</TableCell>
                            <TableCell align="right">Capacity</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Floor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
            {spaces.map(space => (
                <TableRow key={space.data().number} >
                    <TableCell>
                        <Button variant="contained" onClick={() => this.fillBox(space.data().number)}> View your seat</Button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {space.data().number}
                    </TableCell>
                    <TableCell align="right">{space.data().capacity}</TableCell>
                    <TableCell align="right">{space.data().type}</TableCell>
                    <TableCell align="right">{space.data().floor}</TableCell>
                    <TableCell align="right">

                        <Button variant="contained" onClick={() => confirmationBox(space.id,'Are you sure you want to make a booking for space ' + space.data().number + '?',() => makeBooking(space.id, firebase.auth().currentUser.uid, this.state.arrivalDate, this.state.departureDate)) }>
                            Book now
                        </Button>
                    </TableCell>
                </TableRow>


            ))}
            </TableBody>
    </Table>
    </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={spaces.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}
export default Spaces;