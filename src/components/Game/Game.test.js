import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Game from './Game'

it('renders empty given no tabs', () => {
    const component = shallow(<Game id="20394" name="test"/>)
    expect(component).toMatchSnapshot()
})