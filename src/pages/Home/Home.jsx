import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HomeFooter } from '../../components/Home/HomeFooter/HomeFooter'
import { HomeGetStarted } from '../../components/Home/HomeGetStarted/HomeGetStarted'
import { HomeHero } from '../../components/Home/HomeHero/HomeHero'
import { HomeMain } from '../../components/Home/HomeMain/HomeMain'
import { HomeQuotes } from '../../components/Home/HomeQuotes/HomeQuotes'
import { TOKEN_LOGIN } from '../../store/user/UserActions'

export const Home = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.user)

  useEffect(() => !user && dispatch(TOKEN_LOGIN()), [])

  return (
    <main className="home main-grid">
      <HomeHero></HomeHero>
      <HomeMain></HomeMain>
      <HomeQuotes></HomeQuotes>
      <HomeGetStarted></HomeGetStarted>
      <HomeFooter></HomeFooter>
    </main>
  )
}
