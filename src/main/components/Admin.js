import React from 'react';
import SpaceForm from "./SpaceForm";
import AllBookings from "./AllBookings";
import {Route} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import AdminRequests from "./AdminRequests";

class Admin extends React.Component {



    render() {
        return (<div>
                <h1>Admin</h1>
                <SpaceForm/>
                <Grid container>
                    <Grid item xs={6} s={6} zeroMinWidth>
                        <h4>All bookings</h4>
                        <AllBookings/>
                    </Grid>
                    <Grid item xs={6} s={6} zeroMinWidth>
                        <h4>All requests</h4>
                        <AdminRequests/>
                    </Grid>
                </Grid>
            </div>

        );
    }
}
export default Admin;