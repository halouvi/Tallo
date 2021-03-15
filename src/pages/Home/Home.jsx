import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { HomeFooter } from '../../components/Home/HomeFooter/HomeFooter'
import { HomeGetStarted } from '../../components/Home/HomeGetStarted/HomeGetStarted'
import { HomeHero } from '../../components/Home/HomeHero/HomeHero'
import { HomeMain } from '../../components/Home/HomeMain/HomeMain'
import { HomeQuotes } from '../../components/Home/HomeQuotes/HomeQuotes'
import { LOGIN } from '../../store/user/UserActions'

export const Home = props => {

  useEffect(() => {
    var root = document.getElementById('root')
    if (root.style.background !== 'linear-gradient(#006f83, #00aecc)')
      root.style.background = 'linear-gradient(#006f83, #00aecc)'
  }, [])

  return (
    <main className="home main-grid">
      <HomeHero />
      <HomeMain />
      <HomeQuotes />
      <HomeGetStarted />
      <HomeFooter />
    </main>
  )
}
