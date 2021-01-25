import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { store } from './store/Store'
import { DndProvider } from 'react-dnd'
import MouseBackEnd from 'react-dnd-mouse-backend'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { Board } from './pages/Board/Board'
import { CardModal } from './components/Board/CardModal/CardModal'
import { DragLayer } from './components/DragLayer/DragLayer'
import { CreateBoardModal } from './components/Board/CreateBoardModal/CreateBoardModal'
import { LoginSingup } from './components/LoginSignup/LoginSignup'
import './styles/styles.scss'

export const App = () => {
  const PrivateRoute = props => {
    const { user } = useSelector(state => state.userReducer) || {}
    return user?._id ? <Route {...props} /> : <Redirect to="/" />
  }

  return (
    <ReduxProvider store={store}>
      <DndProvider backend={MouseBackEnd}>
        <Router>
          <Header />
          <Switch>
            <PrivateRoute path="/board" component={Board} />
            <Route path="/" component={Home} />
          </Switch>
          <PrivateRoute path="/board/modal/:cardId" component={CardModal} />
          <PrivateRoute path="/create-modal" component={CreateBoardModal} />
          <Route path="/login-signup" component={LoginSingup} />
        </Router>
        <DragLayer />
      </DndProvider>
    </ReduxProvider>
  )
}
