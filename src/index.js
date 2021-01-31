import { StrictMode } from 'react'
import { render } from 'react-dom'
import { HashRouter as RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/Store'
import { DndProvider } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'
import { App } from './App.jsx'

render(
  <StrictMode>
    <ReduxProvider store={store}>
      <DndProvider backend={MouseBackEnd}>
        <RouterProvider>
          <App />
        </RouterProvider>
      </DndProvider>
    </ReduxProvider>
  </StrictMode>,
  document.getElementById('root')
)
