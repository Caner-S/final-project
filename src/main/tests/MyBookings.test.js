import React from 'react';
import renderer from 'react-test-renderer';

import MyBookings from "../components/MyBookings";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<MyBookings />).toJSON();
    expect(tree).toMatchSnapshot();
});