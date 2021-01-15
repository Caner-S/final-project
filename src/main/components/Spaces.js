import React from 'react';
import {getAllSpaces} from "../dao/SpaceDao";
import {processChangesForSnapshot} from "../processes/processor";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


class Spaces extends React.Component {

    constructor() {
        super();
        this.state = {
            spaces: []
        };
    }

    componentDidMount() {
    getAllSpaces().onSnapshot(snapshot => {
        this.setState({spaces: processChangesForSnapshot(this.state.spaces, snapshot)});
    })
    }

    render() {
        let {spaces} = this.state;
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Seat&nbsp;Number</TableCell>
                            <TableCell align="right">Capacity</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Exclusive?</TableCell>
                            <TableCell align="right">Section</TableCell>
                            <TableCell align="right">Floor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
            {spaces.map(space => (
                <TableRow key={space.data().number}>
                    <TableCell component="th" scope="row">
                        {space.data().number}
                    </TableCell>
                    <TableCell align="right">{space.data().capacity}</TableCell>
                    <TableCell align="right">{space.data().type}</TableCell>
                    <TableCell align="right">{space.data().exclusive}</TableCell>
                    <TableCell align="right">{space.data().section}</TableCell>
                    <TableCell align="right">{space.data().floor}</TableCell>
                    <TableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => { alert(space.id) }}>
                            Book now
                        </Button>
                    </TableCell>
                </TableRow>

            ))}
            </TableBody>
    </Table>
    </TableContainer>
        );
    }
}
export default Spaces;