import { useDispatch, useSelector } from 'react-redux'
import { useBeforeunload } from 'react-beforeunload'
import { Redirect, Route, Switch } from 'react-router-dom'
import { DEMO_LOGIN } from './store/user/UserActions'
import { useMount } from 'react-use'
import { socketService } from './service/socketService'
import { Header } from './components/Header/Header'
import { Board } from './pages/Board/Board'
import { Home } from './pages/Home/Home'
import { CardModal } from './pages/CardModal/CardModal'
import { LoginSingup } from './components/LoginSignup/LoginSignup'
import { DragLayer } from './components/DragLayer/DragLayer'
import { Loader } from './components/Loader/Loader'
import { Popover } from './components/Popover/Popover'
import './styles/styles.scss'
import { DragDropContext } from 'react-beautiful-dnd'
import { HANDLE_DROP } from 'store/board/BoardActions'

export const App = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(state => state.userReducer) || {}

  useMount(() => {
    dispatch(DEMO_LOGIN())
    socketService.setup()
  })

  useBeforeunload(socketService.terminate)

  const blurAll = () => document.activeElement.blur()

  const handleDrop = res => dispatch(HANDLE_DROP(res))

  const PrivateRoute = props => (user?._id ? <Route {...props} /> : <Redirect to="/" />)

  return isLoading ? (
    <Loader />
  ) : (
    <DragDropContext onDragStart={blurAll} onDragEnd={handleDrop}>
      <Header />
      <Switch>
        <PrivateRoute path="/board" component={Board} />
        <Route path="/" component={Home} />
      </Switch>
      <PrivateRoute path="/board/card/:cardId" component={CardModal} />
      <Route path="/login-signup" component={LoginSingup} />
      <Popover />
    </DragDropContext>
  )
}
