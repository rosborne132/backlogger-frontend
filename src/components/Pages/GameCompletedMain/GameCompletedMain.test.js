import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import GameCompletedMain from './GameCompletedMain'

it('renders correctly', () => {
    const component = shallow(<GameCompletedMain/>)
    expect(component).toMatchSnapshot()
})