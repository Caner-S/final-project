import React from 'react';
import {addSpace} from "../dao/SpaceDao";

class SpaceForm extends React.Component {
    constructor() {
        super();
        this.state = {
            number: null,
            capacity: null,
            type: null,
            exclusive: null,
            section: null,
            floor: null
         };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    addOfficeSpace = e => {
        e.preventDefault();
        addSpace( this.state.number, this.state.capacity, this.state.type, this.state.exclusive, this.state.section, this.state.floor);

        this.setState({
            number: '',
            capacity: '',
            type: '',
            exclusive: '',
            section: '',
            floor: ''
    });
    };

    render() {
        return (
            <div>
                <h4>New Office space</h4>
            <form onSubmit={this.addOfficeSpace}>
                <input
                    type="number"
                    name="number"
                    placeholder="Number"
                    onChange={this.updateInput}
                    value={this.state.number}
                        />
                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                        onChange={this.updateInput}
                    value={this.state.capacity}
                        />
                <select
                    name="type"
                    placeholder="Type"
                        onChange={this.updateInput}
                    value={this.state.type}
                        >
                    <option value="Desk">Desk</option>
                    <option value="Meeting Room">Meeting Room</option>
                    <option value="Workspace">Workspace</option>
                </select>
                <input
                    type="text"
                    name="exclusive"
                    placeholder="Exclusive"
                        onChange={this.updateInput}
                    value={this.state.exclusive}
                        />
                <input
                    type="number"
                    name="section"
                    placeholder="Section"
                    onChange={this.updateInput}
                    value={this.state.section}
                />
                <input
                    type="number"
                    name="floor"
                    placeholder="Floor"
                        onChange={this.updateInput}
                    value={this.state.floor}
                        />
                <button type="submit">Submit</button>
            </form>
            </div>
        );
    }
}
export default SpaceForm;