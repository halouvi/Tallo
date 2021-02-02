import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useBeforeunload } from 'react-beforeunload'
import { Redirect, Route, Switch } from 'react-router-dom'
import { TOKEN_LOGIN, LOGIN } from './store/user/UserActions'
import { socketService } from './service/socketService'
import { Header } from './components/Header/Header'
import { Board } from './pages/Board/Board'
import { Home } from './pages/Home/Home'
import { CardModal } from './components/Board/CardModal/CardModal'
import { LoginSingup } from './components/LoginSignup/LoginSignup'
import { DragLayer } from './components/DragLayer/DragLayer'
import './styles/styles.scss'

export const App = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.userReducer) || {}
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    try {
      await dispatch(TOKEN_LOGIN())
    } catch (error) {
      try {
        await dispatch(LOGIN({ email: 'deni@avdija.com', password: '123' }))
      } catch (error) {
        console.error(`login failed: ${error}`)
      }
    } finally {
      socketService.setup()
      setIsLoading(false)
    }
  }, [])

  useBeforeunload(() => socketService.terminate())

  const PrivateRoute = props => (user?._id ? <Route {...props} /> : <Redirect to="/" />)

  return isLoading ? (
    <div className="fp flex ac jc">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
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
