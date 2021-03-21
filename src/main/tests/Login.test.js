import React from 'react';
import renderer from 'react-test-renderer';

import LoginForm from "../components/Login";

it('renders correctly when there are no items', () => {
    const tree = renderer.create(<LoginForm />).toJSON();
    expect(tree).toMatchSnapshot();
});