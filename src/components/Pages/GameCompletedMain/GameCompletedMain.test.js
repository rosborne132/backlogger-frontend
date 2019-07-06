import React from 'react'
import { shallow } from 'enzyme'
import GameCompletedMain from './GameCompletedMain'

it('renders correctly', () => {
    const component = shallow(<GameCompletedMain/>)
    expect(component).toMatchSnapshot()
})