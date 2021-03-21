import React from 'react';
import renderer from 'react-test-renderer';

import Confirm from "../components/Confirm";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<Confirm />).toJSON();
    expect(tree).toMatchSnapshot();
});