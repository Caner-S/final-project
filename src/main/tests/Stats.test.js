import React from 'react';
import renderer from 'react-test-renderer';

import Stats from '../components/Stats';

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<Stats />).toJSON();
    expect(tree).toMatchSnapshot();
});