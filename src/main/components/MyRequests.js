import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from "../../config/firebase";
import "./MyBookings.css";
import Confirm from "./Confirm";
import {deleteRequest, getRequestByUserId} from "../dao/RequestDao";


class MyRequests extends React.Component {


    constructor() {
        super();
        this.state = {
            requests: [],
        };

    }

    componentDidMount() {

        let currentComponent = this;
        if(firebase.auth().currentUser){
        getRequestByUserId(firebase.auth().currentUser.uid).then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let updatedData = querySnapshot.docs.map(doc => doc)
                currentComponent.setState({ requests: updatedData })

            })
        })
        }

    }

    cancelRequest(id){
        this.setState({requests: this.state.requests.filter(item => item.id !== id)});
        deleteRequest(id);
    }




    render() {
        let {requests} = this.state;
        return (
            <div className="BookingsBorder">
                <h4>My Requests</h4>
                <TableContainer component={Paper} className="container">
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Space&nbsp;Id</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Business&nbsp;Case</TableCell>
                                <TableCell align="right">Arrival Time</TableCell>
                                <TableCell align="right">Departure Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {requests.map(request => (
                                <TableRow key={request.id} >
                                    <TableCell component="th" scope="row">
                                        {request.data().spaceId}
                                    </TableCell>
                                    <TableCell align="right"> {request.data().status}</TableCell>
                                    <TableCell align="right"> {request.data().businessCase}</TableCell>
                                    <TableCell align="right">{new Date(request.data().arrivalDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">{new Date(request.data().departureDate).toLocaleString()}</TableCell>
                                    <TableCell align="right">
                                        <Confirm buttonText="Cancel Request" title={"Cancel a Request"} description={"Are you sure you want to cancel your request "+request.data().spaceId+" at "+ new Date(request.data().arrivalDate).toLocaleString() +"?"} onAccept={() => { this.cancelRequest(request.id)}} />

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
export default MyRequests;