import React from 'react';
import renderer from 'react-test-renderer';

import AllBookings from "../components/AllBookings";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<AllBookings />).toJSON();
    expect(tree).toMatchSnapshot();
});