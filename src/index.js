import { StrictMode } from 'react'
import { render } from 'react-dom'
import { HashRouter as RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as EventBusProvider } from 'react-bus'

import { store } from './store/Store'
import { DndProvider } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { App } from './App.jsx'
import { HTML5Backend } from 'react-dnd-html5-backend'

// const hasNative = document && (document.elementsFromPoint || document.msElementsFromPoint)
// function getDropTargetElementsAtPoint(x, y, dropTargets) {
//   return dropTargets.filter(t => {
//     const rect = t.getBoundingClientRect()
//     return (
//       x >= rect.left &&
//       x <= rect.right &&
//       y <= rect.bottom &&
//       y >= rect.top
//     )
//   })
// }

// function getDropTargetElementsAtPoint(x, y, dropTargets) {
//   return dropTargets.filter(t => {
//     const rect = t.getBoundingClientRect()
//     return x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top
//   })
// }

// const backendOptions = {
//   getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint
// }

render(
  // <StrictMode>
  <EventBusProvider>
    <RouterProvider>
      <ReduxProvider store={store}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </ReduxProvider>
    </RouterProvider>
  </EventBusProvider>,
  // </StrictMode>,
  document.getElementById('root')
)

// navigator.serviceWorker.register('./serviceWorker.js');
