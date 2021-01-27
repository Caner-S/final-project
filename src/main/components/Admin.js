import React from 'react';
import SpaceForm from "./SpaceForm";
import AllBookings from "./AllBookings";
import Grid from "@material-ui/core/Grid";
import AdminRequests from "./AdminRequests";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {Button} from "@material-ui/core";
import {updateSiteInformation} from "../dao/EnvironmentDao";
//import SnackbarSuccess from "./SnackbarSuccess";

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            businessCase: false,
        };
    }

    handleChange = (event) => {
        this.setState({businessCase: event.target.value});
    };

    submitBusinessCase = e => {
        e.preventDefault();
        updateSiteInformation(this.state.businessCase);

    }

    isBusinessCase() {
        if (this.state.businessCase) {
            return <Grid item xs={12} s={12} m={6} zeroMinWidth>
                <h4>All requests</h4>
                <AdminRequests/>
            </Grid>
        }
    }



    render() {
        let {businessCase} = this.state;
        return (
            <div>
                <h1>Admin</h1>
                <SpaceForm/>
                <h4>COVID MODE</h4>
                <form onSubmit={this.submitBusinessCase}>
                    <InputLabel >Require Business Case?</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={businessCase}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                    <Button type="submit" >Submit</Button>
                </form>
                <Grid container>
                    <Grid item xs={12} s={12} m={6} zeroMinWidth>
                        <h4>All bookings</h4>
                        <AllBookings/>
                    </Grid>
                    {this.isBusinessCase()}
                </Grid>

            </div>

        );
    }
}
export default Admin;