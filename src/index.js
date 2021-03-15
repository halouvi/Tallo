import { StrictMode } from 'react'
import { render } from 'react-dom'
import { HashRouter as RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as EventBusProvider } from 'react-bus'
import { store } from 'store/Store'
import { App } from 'App.jsx'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
<<<<<<< HEAD
import { App } from './App.jsx'

=======
>>>>>>> 3e5a53644e4a731c3c00320db2ceaa072f638425

render(
  // <StrictMode>
  <EventBusProvider>
    <RouterProvider>
      <ReduxProvider store={store}>
        <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
          <App />
        </DndProvider>
      </ReduxProvider>
    </RouterProvider>
  </EventBusProvider>,
  //</StrictMode>
  document.getElementById('root')
)

// navigator.serviceWorker.register('./serviceWorker.js');
