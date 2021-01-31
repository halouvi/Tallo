import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { HomeFooter } from '../../components/Home/HomeFooter/HomeFooter'
import { HomeGetStarted } from '../../components/Home/HomeGetStarted/HomeGetStarted'
import { HomeHero } from '../../components/Home/HomeHero/HomeHero'
import { HomeMain } from '../../components/Home/HomeMain/HomeMain'
import { HomeQuotes } from '../../components/Home/HomeQuotes/HomeQuotes'
import { LOGIN } from '../../store/user/UserActions'

export const Home = props => {
  // const dispatch = useDispatch()
  // const user = useSelector(state => state.userReducer.user)

  // useEffect(() => !user && dispatch(LOGIN()), [])

  // useEffect(() => {
  //   dispatch(LOGIN({ email: 'deni@avdija.com', password: '123' }))
  // }, [])

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
