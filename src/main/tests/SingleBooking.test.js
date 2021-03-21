import React from 'react';
import renderer from 'react-test-renderer';

import SingleBooking from "../components/SingleBooking";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<SingleBooking />).toJSON();
    expect(tree).toMatchSnapshot();
});