import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/Store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { Board } from './pages/Board/Board'
import { CardModal } from './components/Board/CardModal/CardModal'
import './styles/styles.scss'

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Header />
          <Switch>
            {/* <Route path="/contact/:id" component={ContactDetails} /> */}
            <Route path="/board" component={Board} />
            {/* <Route path="/stats" component={Stats} /> */}
            <Route path="/" component={Home} />
          </Switch>
          <Route path="/board/modal/:id" component={CardModal} />
        </Router>
      </DndProvider>
    </ReduxProvider>
  )
}
