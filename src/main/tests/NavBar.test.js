import React from 'react';
import renderer from 'react-test-renderer';

import NavBar from "../components/NavBar/NavBar";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<NavBar />).toJSON();
    expect(tree).toMatchSnapshot();
});