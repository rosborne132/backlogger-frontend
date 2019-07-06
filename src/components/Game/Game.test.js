import React from 'react'
import { shallow } from 'enzyme'
import Game from './Game'

it('renders empty given no tabs', () => {
    const component = shallow(<Game id={20394} title="test"/>)
    expect(component).toMatchSnapshot()
})