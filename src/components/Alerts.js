import { Box, Container, List, ListItem } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const typeToColor = {
  success: 'forestgreen',
  attention: 'goldenrod',
  error: 'tomato',
}

const Alerts = () => {
  const alerts = useSelector((state) => state.alerts)

  const color = typeToColor[alerts.type]
  const style = {
    fontStyle: 'italic',
    fontSize: 16,
    padding: 24,
    margin: 4,
    color: color,
    border: `solid 2px ${color}`,
    borderRadius: '5px',
  }

  if (alerts.messages.length > 0)
    return (
      <Container>
        <List style={style} id='alerts'>
          {alerts.messages.map((alert, i) => (
            <ListItem key={`alert${i}`}>{alert}</ListItem>
          ))}
        </List>
      </Container>
    )
  else return null
}

export default Alerts
