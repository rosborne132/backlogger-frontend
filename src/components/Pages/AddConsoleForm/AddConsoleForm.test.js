import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import AddConsoleForm from './AddConsoleForm'

it('renders correctly', () => {
    const component = shallow(<AddConsoleForm/>)
    expect(component).toMatchSnapshot()
})