import { StrictMode } from 'react'
import { render } from 'react-dom'
import { HashRouter as RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as EventBusProvider } from 'react-bus'
import { store } from 'store/Store'
import { App } from 'App.jsx'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import MouseBackend from 'react-dnd-mouse-backend'
import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch' // or any other pipeline
import { DragDropContext } from 'react-beautiful-dnd'

// import { DndProvider } from 'react-dnd-multi-backend';

render(
  // <StrictMode>
  <EventBusProvider>
    <RouterProvider>
      <ReduxProvider store={store}>
        {/* <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true, touchSlop: 4 }}> */}
        {/* <DndProvider backend={MouseBackend}> */}
          <App />
        {/* </DndProvider> */}
      </ReduxProvider>
    </RouterProvider>
  </EventBusProvider>,
  //</StrictMode>
  document.getElementById('root')
)

// navigator.serviceWorker.register('./serviceWorker.js');
