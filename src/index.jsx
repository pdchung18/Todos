import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'

import App from '@/layouts/App'
import '@/styles/index.scss'

const render = () => {
  ReactDOM.render((
    <AppContainer>
      <App />
    </AppContainer>
  ), document.getElementById('root'))
}

render()

if (module.hot) {
  module.hot.accept('@/layouts/App', () => {
    render(App)
  })
}
