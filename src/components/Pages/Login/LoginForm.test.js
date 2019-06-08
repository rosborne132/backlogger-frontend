import React from 'react'
import { shallow } from 'enzyme'
import LoginForm from './LoginForm'

it('shoud render without crashing', () => {
  const component = shallow(<LoginForm />)
  expect(component).toMatchSnapshot()
})