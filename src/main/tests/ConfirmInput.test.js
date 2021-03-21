import React from 'react';
import renderer from 'react-test-renderer';

import ConfirmInput from "../components/ConfirmInput";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<ConfirmInput />).toJSON();
    expect(tree).toMatchSnapshot();
});