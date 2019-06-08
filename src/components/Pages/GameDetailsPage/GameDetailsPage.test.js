import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import GameDetailsPage from './GameDetailsPage'

it('renders correctly', () => {
    const component = shallow(<GameDetailsPage/>)
    expect(component).toMatchSnapshot()
})