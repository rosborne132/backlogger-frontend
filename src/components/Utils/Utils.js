import React, { memo, PureComponent } from 'react'
import { format as formatDate } from 'date-fns'
import './Utils.css'

export function NiceDate({ date, format='Do MMMM YYYY' }) {
  return formatDate(date, format)
}

export function Button({ className, ...props }) {
  return <button className={['Button', className].join(' ')} {...props} />
}

export function Textarea({ className, ...props }) {
  return (
    <textarea className={['Textarea', className].join(' ')} {...props} />
  )
}

export function Input({ className, ...props }) {
  return (
    <input className={['Input', className].join(' ')} {...props} />
  )
}

export const InputGroup = memo(({ labelFor, labelText, inputType, inputName, inputID, inputValue, onChange }) => {
  return (
    <p>
      <label htmlFor={labelFor}>{labelText} <Required /></label>
      <input type={inputType} name={inputName} value={inputValue} onChange={onChange} id={inputID} required />
    </p>
  )
})

export function Required({ className, ...props }) {
  return (
    <span className={['Required', className].join(' ')} {...props}>
      &#42;
    </span>
  )
}

export class GameError extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      return <h2>Could not display game. :(</h2>
    } else {
      return children
    }
  }
}
