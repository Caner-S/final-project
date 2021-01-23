import React from 'react';
import Grid from "@material-ui/core/Grid";
import floorPlan from "../../6th Floor Holborn.svg";
import Spaces from "./Spaces";
import './Home.css';

class Home extends React.Component {

    businessCaseWarning(){
        if(this.props.businessCase){
            return <div className="businessCaseBorder">
                <h3 className="businessCaseWarning">Due to the current pandemic, all requests must be approved with a suitable business case. </h3>
                <h3 className="businessCaseWarning">  The status of these requests can be found on the 'My Booking' page.</h3>
            </div>
                }
    }

    render() {
        return (
            <div>
            {this.businessCaseWarning()}
            <Grid container>

                <Grid item xs={6} s={6} zeroMinWidth>
                    <object data={floorPlan} id="svg" aria-label="floorPlan"/>
                </Grid>
                <Grid item xs={6} s={6} zeroMinWidth>

                    <Spaces businessCase={this.props.businessCase}/>
                </Grid>
            </Grid>
            </div>
        );
    }
}
export default Home;