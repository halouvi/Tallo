import { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { Board } from './pages/Board/Board'
import { CardModal } from './components/Board/CardModal/CardModal'
import { DragLayer } from './components/DragLayer/DragLayer'
import { LoginSingup } from './components/LoginSignup/LoginSignup'
import { socketService } from './service/socketService'
import { TOKEN_LOGIN, LOGIN } from './store/user/UserActions'
import './styles/styles.scss'

export const App = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector(state => state.userReducer) || {}

  const PrivateRoute = props => {
    return user?._id ? <Route {...props} /> : <Redirect to="/" />
  }

  useEffect(() => {
    dispatch(LOGIN({ email: 'deni@avdija.com', password: '123' }))
    // dispatch(TOKEN_LOGIN())
    socketService.setup()
    window.onbeforeunload = () => {
      socketService.terminate()
    }
  }, [])

  return isLoading ? (
    <div className="fp flex ac jc">Loading...</div>
  ) : (
    <>
      <Header />
      <Switch>
        <PrivateRoute path="/board" component={Board} />
        <Route path="/" component={Home} />
      </Switch>
      <PrivateRoute path="/board/modal/:cardId" component={CardModal} />
      <Route path="/login-signup" component={LoginSingup} />
      <DragLayer />
    </>
  )
}
