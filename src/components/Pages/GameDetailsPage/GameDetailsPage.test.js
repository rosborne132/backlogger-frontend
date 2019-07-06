import React from 'react'
import { shallow } from 'enzyme'
import GameDetailsPage from './GameDetailsPage'

it('renders correctly', () => {
    const component = shallow(<GameDetailsPage/>)
    expect(component).toMatchSnapshot()
})