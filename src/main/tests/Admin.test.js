import React from 'react';
import renderer from 'react-test-renderer';

import Admin from "../components/Admin";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<Admin />).toJSON();
    expect(tree).toMatchSnapshot();
});