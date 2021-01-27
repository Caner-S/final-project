import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    getAvailableSpaces,
    getUnavailableBookings,
    makeBooking
} from "../dao/BookingDao";
import TextField from "@material-ui/core/TextField";
import firebase from "../../config/firebase";
import './Spaces.css';
import TablePagination from "@material-ui/core/TablePagination";
import Confirm from "./Confirm";
import ConfirmInput from "./ConfirmInput";
import {getAllSpaces} from "../dao/SpaceDao";


class Spaces extends React.Component {

    constructor(props) {
        super(props);
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



     async componentDidMount() {
         const allSpaces = await getAllSpaces();
         this.setState({ spaces: allSpaces });
         this.getAllAvailableSpace();
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
        this.fillAvailableSpaces();

     }

    getAllAvailableSpace = async () => this.processSpaces(getUnavailableBookings(this.state.arrivalDate, this.state.departureDate, this.state.todayISO));

    processSpaces = async (newSpaces) => {
        let currentComponent = this;
        const endTimeDate = new Date(this.state.departureDate).valueOf();
        try {
            const snapshot = await newSpaces;
            snapshot.onSnapshot((snapshot) => {
                snapshot.forEach(function(doc) {
                    if(endTimeDate > doc.data().arrivalDate){
                        currentComponent.setState({spaces: currentComponent.state.spaces.filter(item => item.id !== doc.data().spaceId)});
                    }
                    console.log("Snapshot Called");
                });
            })
        } catch (e) {
        console.log(e)
        }
    }


    updateDeparture = e => {
        const arrivalDay = this.state.arrivalDate.substring(8, 10);
        const departureDate = e.target.value.substring(8, 10);
        if(arrivalDay === departureDate) {
            this.setState({
                [e.target.name]: e.target.value
            });
        }else {
            alert("Arrival and departure must be on the same day.");

        }
    }

    updateArrival = e => {
            this.setState({
                [e.target.name]: e.target.value,
                departureDate: e.target.value,
            });

    }

    fillBox (space)  {
            const a = document.getElementById("svg");
            const svgDoc = a.contentDocument;
            const elements = svgDoc.getElementsByClassName(space.toString());
            if(typeof elements[0] !== "undefined"){
            elements[0].style.fill = 'orange';
            setTimeout(function(){
                elements[0].style.fill = 'green';
                elements[0].onclick = function() { console.log(space.toString()); };
            }, 2000);
            } else {
                alert("Space not found");
            }
    }

    svgColourer (space, colour)  {
        const a = document.getElementById("svg");
        const svgDoc = a.contentDocument;
        const elements = svgDoc.getElementsByClassName(space.toString());
        if(typeof elements[0] !== "undefined"){
            elements[0].style.fill = colour;
            elements[0].onclick = function() { console.log(space.toString()); };
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
            return <ConfirmInput buttonText="Request Now" title={"Book a space"} description={"lol"} spaceId={space.id} user={firebase.auth().currentUser.uid} arrive={this.state.arrivalDate} depart={this.state.departureDate}/>
        } else {
            return <Confirm buttonText="Book Now" title={"Book a space"} description={"lol"} onAccept={() => { makeBooking(space.id, firebase.auth().currentUser.uid, this.state.arrivalDate, this.state.departureDate, space.data().number)}} />

        }
    }

    fillAvailableSpaces() {
        if (this.props.loadSpaces) {
            this.state.spaces.map(space => (
                this.svgColourer(space.data().number, "green")
            ));
        }
    }


    render() {
        let {spaces} = this.state;
        return (
            <div className="border" >
                <form >
                    <TextField
                        id="datetime-local-arrive"
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
                        id="datetime-local-depart"
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
                            <TableCell align="right">Capacity</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Floor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
            {spaces.map(space => (
                <TableRow key={space.data().number} onClick={() => this.fillBox(space.data().number)} >
                    <TableCell component="th" scope="row">
                        {space.data().number}
                    </TableCell>
                    <TableCell align="right">{space.data().capacity}</TableCell>
                    <TableCell align="right">{space.data().type}</TableCell>
                    <TableCell align="right">{space.data().floor}</TableCell>
                    <TableCell align="right">
                        {this.businessCase(space)}
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