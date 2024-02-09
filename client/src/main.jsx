import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeProvider from './components/ThemeProvider.jsx'
import { Provider } from 'react-redux'
import {store} from "./redux/Store.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider>
        <App />
      </ThemeProvider>
  </Provider>
      
    
)
