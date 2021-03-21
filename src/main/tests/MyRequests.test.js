import React from 'react';
import renderer from 'react-test-renderer';

import MyRequests from "../components/MyRequests";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<MyRequests />).toJSON();
    expect(tree).toMatchSnapshot();
});