import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import GamePageMain from './GamePageMain'

it('renders correctly', () => {
    const component = shallow(<GamePageMain match={{params: "sdlfkj"}}/>)
    expect(component).toMatchSnapshot()
})