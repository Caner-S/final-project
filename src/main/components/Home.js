import React from 'react';
import Grid from "@material-ui/core/Grid";
import floorPlan from "../../6th Floor Holborn.svg";
import Spaces from "./Spaces";

class Home extends React.Component {



    render() {
        return (
            <Grid container>
                <Grid item xs={6} s={6} zeroMinWidth>
                    <object data={floorPlan} id="svg" />
                </Grid>
                <Grid item xs={6} s={6} zeroMinWidth>
                    <Spaces businessCase={this.props.businessCase}/>
                </Grid>
            </Grid>
        );
    }
}
export default Home;