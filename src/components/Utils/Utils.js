import React, { memo, PureComponent } from 'react'
import formStyles from "../StyledComponents/Form.modules.css"
import './Utils.css'

export const InputGroup = memo(({ labelFor, labelText, inputType, inputName, inputID, inputValue, onChange }) => {
  return (
    <p style={formStyles.p}>
      <label style={formStyles.label} htmlFor={labelFor}>{labelText} <Required /></label>
      <input style={formStyles.input} type={inputType} name={inputName} value={inputValue} onChange={onChange} id={inputID} required />
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

export const ValidationError = memo(({ message }) => {
  return (
    <>
      <span className="error">
        <p>{message}</p>
      </span>
    </>
  )
})
