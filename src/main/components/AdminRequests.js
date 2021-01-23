import React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import "./Spaces.css";
import { getAllPendingRequests, updateStatus} from "../dao/RequestDao";
import {makeBooking} from "../dao/BookingDao";
import Confirm from "./Confirm";

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
        this.setState({requests: await getAllPendingRequests()});
    }

    approveRequest(request){
        //set status to approved
        makeBooking(request.data().spaceId, request.data().userId, request.data().arrivalDate, request.data().departureDate);
        updateStatus(request.id, "Approved");
    }

    cancelRequest(request){
        //set status to denied
        updateStatus(request.id, "Denied");

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
                                        <Confirm buttonText="Approve" title={"Approve a request"} description={"lol"} onAccept={() => { this.approveRequest(request)}} />

                                    </TableCell>
                                    <TableCell align="right">
                                        <Confirm buttonText="Deny" title={"Deny a request"} description={"lol"} onAccept={() => { this.cancelRequest(request)}} />

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