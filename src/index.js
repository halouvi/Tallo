import { StrictMode } from 'react'
import { render } from 'react-dom'
import { HashRouter as RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/Store'
import { DndProvider } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { App } from './App.jsx'

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

// const backendOptions = {
//   getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint,
//   delayTouchStart: 3,
// scrollAngleRanges: [
//   { start: 30, end: 150 },
//   { start: 210, end: 330 },
//   { start: 300 }, { end: 60 }, { start: 120, end: 240 }
// ]
// }

render(
  <StrictMode>
    <ReduxProvider store={store}>
      {/* <DndProvider backend={window.innerWidth > 600 ? MouseBackEnd: TouchBackend}  options={backendOptions}> */}
      <DndProvider backend={MouseBackEnd}>
        <RouterProvider>
          <App />
        </RouterProvider>
      </DndProvider>
    </ReduxProvider>
  </StrictMode>,
  document.getElementById('root')
)

navigator.serviceWorker.register('./serviceWorker.js');
