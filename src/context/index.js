import React from 'react'

const ReactContext = React.createContext({
  activeItem: '',
  updateActiveItem: () => {},
})

export default ReactContext
