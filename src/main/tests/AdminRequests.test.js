import React from 'react';
import renderer from 'react-test-renderer';

import AdminRequests from "../components/AdminRequests";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<AdminRequests />).toJSON();
    expect(tree).toMatchSnapshot();
});