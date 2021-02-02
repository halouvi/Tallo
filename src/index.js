import { StrictMode } from 'react'
import { render } from 'react-dom'
import { HashRouter as RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/Store'
import { DndProvider } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { App } from './App.jsx'

const hasNative = document && (document.elementsFromPoint || document.msElementsFromPoint)

function getDropTargetElementsAtPoint(x, y, dropTargets) {
  return dropTargets.filter(t => {
    const rect = t.getBoundingClientRect()
    return (
      x >= rect.left &&
      x <= rect.right &&
      y <= rect.bottom &&
      y >= rect.top
    )
  })
}

const backendOptions = {
  getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint,
}

// const windowSize = () => {
//   return window.innerWidth
// } 

// window.addEventListener('resize', () => {
//   windowSize()
//   console.log(windowSize());
// })

render(
  <StrictMode>
    <ReduxProvider store={store}>
      <DndProvider backend={window.innerWidth > 600 ? MouseBackEnd: TouchBackend} delayTouchStart={3} options={backendOptions}>
        <RouterProvider>
          <App />
        </RouterProvider>
      </DndProvider>
    </ReduxProvider>
  </StrictMode>,
  document.getElementById('root')
)

navigator.serviceWorker.register('./serviceWorker.js');
