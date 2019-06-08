import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import AllGamesPageMain from './AllGamesPageMain'

it('renders correctly', () => {
    const component = shallow(<AllGamesPageMain match={{params: "sdlfkj"}}/>)
    expect(component).toMatchSnapshot()
})