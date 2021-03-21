import React from 'react';
import renderer from 'react-test-renderer';

import SpaceForm from "../components/SpaceForm";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<SpaceForm />).toJSON();
    expect(tree).toMatchSnapshot();
});