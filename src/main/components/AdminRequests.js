import React from 'react';
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
import {deleteRequest, getAllRequests} from "../dao/RequestDao";
import {makeBooking} from "../dao/BookingDao";

class AdminRequests extends React.Component {
    constructor() {
        super();
        this.state = {
            requests: [],
            open: false,
            id: 'test',
        };
    }

    componentDidMount() {

        this.getRequests();

    }

    async getRequests() {
        this.setState({requests: await getAllRequests()});
    }

    approveRequest(request){
        //set status to approved
        makeBooking(request.data().userId, request.data().spaceId, request.data().arrivalDate, request.data().departureDate);

    }

    cancelRequest(){
        //set status to denied

    }



    render() {
        let {requests} = this.state;
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
                                <TableCell align="right">Business Case</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map(request => (
                                <TableRow key={request.id} >
                                    <TableCell component="th" scope="row">
                                        {request.data().userId}
                                    </TableCell>
                                    <TableCell align="right">{request.data().spaceId}</TableCell>
                                    <TableCell align="right">{new Date(request.data().arrivalDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">{new Date(request.data().departureDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">{request.data().businessCase}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary" onClick={() => confirmationBox(request.id,'Are you sure you want to approve request ' + request.id + '?',() => this.approveRequest(request))}>
                                            Approve
                                        </Button>

                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary" onClick={() => confirmationBox(request.id,'Are you sure you want to cancel request ' + request.id + '?',() => deleteRequest(request.id))}>
                                            Cancel
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
export default AdminRequests;