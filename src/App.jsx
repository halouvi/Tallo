import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/Store'
import { DndProvider } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { Board } from './pages/Board/Board'
import { CardModal } from './components/Board/CardModal/CardModal'
import { DragLayer } from './components/DragLayer/DragLayer'
import { socketService } from './service/socketService'
import { useEffect } from 'react'
import './styles/styles.scss'

export const App = () => {
  // useEffect(() => {
  //   socketService.setup()
  //   return () => {
  //     socketService.terminate()
  //   }
  // }, [])
  return (
    <ReduxProvider store={store}>
      <DndProvider backend={MouseBackEnd}>
        <Router>
          <Header />
          <Switch>
            {/* <Route path="/contact/:id" component={ContactDetails} /> */}
            <Route path="/board" component={Board} />
            {/* <Route path="/stats" component={Stats} /> */}
            <Route path="/" component={Home} />
          </Switch>
          <Route path="/board/modal/:_id" component={CardModal} />
        </Router>
        <DragLayer />
      </DndProvider>
    </ReduxProvider>
  )
}
