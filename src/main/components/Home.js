import React from 'react';
import Grid from "@material-ui/core/Grid";
import floorPlan from "../../6th Floor Holborn.svg";
import Spaces from "./Spaces";
import './Home.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {getAllSpaces} from "../dao/SpaceDao";
import {getUnavailableBookings} from "../dao/BookingDao";
import TextField from "@material-ui/core/TextField";
import SingleBooking from "./SingleBooking";

class Home extends React.Component {
    constructor(props) {
        super(props);
        let today = new Date().toISOString().slice(0, 10);
        this.state = {
            spaces: [],
            todayISO: today+"T23:59",
            arrivalDate: today+"T09:00",
            departureDate: today+"T17:00",
            loadSpaces: false,
            view: 'table',
            currentSpace: undefined,
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
                        currentComponent.svgColourer(doc.data().seatNumber, "none");
                    }
                });
            })
        } catch (e) {
            console.log(e)
        }
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

                    <Spaces businessCase={this.props.businessCase} spaces={this.state.spaces} arrivalDate={this.state.arrivalDate} departureDate={this.state.departureDate}/>
                </Grid>
            </Grid>

        }else if (this.state.view === 'floorplan'){
            return  <Grid container >

                <Grid item xs={8} s={6} zeroMinWidth>
                    <object data={floorPlan} id="svg" aria-label="floorPlan" onLoad={() => this.setState({loadSpaces: true})}/>
                </Grid>

                <Grid item xs={4} s={6} zeroMinWidth>
                    <SingleBooking businessCase={this.props.businessCase} space={this.state.currentSpace} arrivalDate={this.state.arrivalDate} departureDate={this.state.departureDate}/>
                </Grid>


            </Grid>

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



    svgColourer (space, colour)  {
        let currentComponent = this;
        const a = document.getElementById("svg");
        const svgDoc = a.contentDocument;
        const elements = svgDoc.getElementsByClassName(space.toString());
        if(typeof elements[0] !== "undefined"){
            elements[0].style.fill = colour;
            elements[0].onclick = function() { currentComponent.getCurrentSelection(space);};
        }
    }

    getCurrentSelection(space){
        let obj = this.state.spaces.find(o => o.data().number === space);
        this.setState({currentSpace: obj })
    }

    fillAvailableSpaces() {
        if (this.state.loadSpaces) {
            this.state.spaces.map(space => (
                this.svgColourer(space.data().number, "green")
            ));
        }
    }


    render() {

        return (
            <div>
                <Grid container>

                    <Grid item xs={6} s={6} zeroMinWidth>
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
                    </Grid>
                    <Grid item xs={6} s={6} zeroMinWidth>
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
                    </Grid>
                </Grid>
            {this.businessCaseWarning()}
            {this.bookingType()}

            </div>
        );
    }
}
export default Home;