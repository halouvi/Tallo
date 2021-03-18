import { useDispatch, useSelector } from 'react-redux'
import { useBeforeunload } from 'react-beforeunload'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { DEMO_LOGIN } from './store/user/UserActions'
import { useMount } from 'react-use'
import { socketService } from './service/socketService'
import { Header } from './components/Header/Header'
import { Board } from './pages/Board/Board'
import { Home } from './pages/Home/Home'
import { CardModal } from './pages/CardModal/CardModal'
import { LoginSingup } from './components/LoginSignup/LoginSignup'
import { Loader } from './components/Loader/Loader'
import { Popover } from './components/Popover/Popover'
import { preLoad } from 'service/preLoadService.js'

import './styles/styles.scss'

export const App = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(state => state.userReducer) || {}

  useMount(() => {
    preLoad()
    dispatch(DEMO_LOGIN())
    socketService.setup()
  })

  useBeforeunload(socketService.terminate)

  const PrivateRoute = props => (user?._id ? <Route {...props} /> : <Redirect to="/" />)

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <Switch>
        <PrivateRoute path="/board" component={Board} />
        <Route path="/" component={Home} />
      </Switch>
      <PrivateRoute path="/board/card/:cardId" component={CardModal} />
      <Route path="/login-signup" component={LoginSingup} />
      <Popover />
    </>
  )
}
