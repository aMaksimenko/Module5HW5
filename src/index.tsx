import 'bootstrap/dist/css/bootstrap.min.css'
import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'containers/App'
import { Provider as IoCProvider, container } from 'ioc'

ReactDOM.render(
  <React.StrictMode>
    <IoCProvider container={container}>
      <App />
    </IoCProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
