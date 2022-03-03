import React from 'react'

/* CSS for error class */
const errorStyle = {
  color: 'red',
  fontStyle: 'italic',
  fontSize: 16,
  padding: 24,
  margin: 4,
  border: 'solid 2px red',
  borderRadius: '5px'
}

/* CSS for success class */
const successStyle = {
  color: 'green',
  fontStyle: 'italic',
  fontSize: 16,
  padding: 24,
  margin: 4,
  border: 'solid 2px green',
  borderRadius: '5px'
}

const SuccessMsg = ({ text }) => <li>{text}</li>

const ErrorMsg = ({ text }) => <li>{text}</li>

const Alerts = ({ messages }) => {
  return (
    <div>
      { messages.SUCCESS.length > 0 ?
        <ul style={successStyle}>
          { messages['SUCCESS'].map((msg,i) => (
            <SuccessMsg key={`succmsg${i}`} text={msg} />
          ))}
        </ul>
        : null
      }

      { messages.ERROR.length > 0 ?
        <ul style={errorStyle}>
          { messages['ERROR'].map((msg, i) => (
            <ErrorMsg key={`errmsg${i}`} text={msg} />
          ))}
        </ul>
        : null }
    </div>
  )
}

export default Alerts