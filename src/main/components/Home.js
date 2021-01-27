import React from 'react';
import Grid from "@material-ui/core/Grid";
import floorPlan from "../../6th Floor Holborn.svg";
import Spaces from "./Spaces";
import './Home.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            loadSpaces: false,
            view: 'table',
        };
    }


    handleAlignment = (e, newAlignment) => {
        e.preventDefault();
        this.setState({view: newAlignment});
    };

    businessCaseWarning(){
        if(this.props.businessCase){
            return <div className="businessCaseBorder">
                <h3 className="businessCaseWarning">Due to the current pandemic, all requests must be approved with a suitable business case. </h3>
                <h3 className="businessCaseWarning">  The status of these requests can be found on the 'My Booking' page.</h3>
            </div>
                }
    }

    bookingType(){
        if(this.state.view === 'table'){
            return  <Grid container>

                <Grid item xs={6} s={6} zeroMinWidth>
                    <object data={floorPlan} id="svg" aria-label="floorPlan" onLoad={() => this.setState({loadSpaces: true})}/>
                </Grid>
                <Grid item xs={6} s={6} zeroMinWidth>

                    <Spaces businessCase={this.props.businessCase} loadSpaces={this.state.loadSpaces}/>
                </Grid>
            </Grid>

        }else if (this.state.view === 'floorplan'){
            return  <Grid container>

                <Grid item xs={12} s={6} zeroMinWidth>
                    <object data={floorPlan} id="svg" aria-label="floorPlan" onLoad={() => this.setState({loadSpaces: true})}/>
                </Grid>

            </Grid>

        }
    }


    render() {
        return (
            <div>
                <ToggleButtonGroup
                    value={this.state.view}
                    exclusive
                    onChange={this.handleAlignment}
                    aria-label="booking view"
                >
                    <ToggleButton value="table" aria-label="table view">
                        Table View
                    </ToggleButton>
                    <ToggleButton value="floorplan" aria-label="floorplan view">
                        Floorplan View
                    </ToggleButton>
                </ToggleButtonGroup>
            {this.businessCaseWarning()}
            {this.bookingType()}

            </div>
        );
    }
}
export default Home;