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
import './styles/styles.scss'
import { LoginSingup } from './components/LoginSignup/LoginSignup'

export const App = () => {
  // const { user } = useSelector(state => state.userReducer) || {}

  // const PrivateRoute = (props) => {
  //   return user?._id ? <Route {...props} /> : <Redirect to="/" />
  // }

  return (
    <ReduxProvider store={store}>
      <DndProvider backend={MouseBackEnd}>
        <Router>
          <Header />
          <Switch>
            <Route path="/board" component={Board} />
            <Route path="/" component={Home} />
          </Switch>
          <Route path="/board/modal/:_id" component={CardModal} />
          <Route path="/create-modal" component={CreateBoardModal} />
          <Route path="/login-signup" component={LoginSingup} />
        </Router>
        <DragLayer />
      </DndProvider>
    </ReduxProvider>
  )
}
