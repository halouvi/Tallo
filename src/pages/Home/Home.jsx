import { HomeFooter } from '../../components/Home/HomeFooter/HomeFooter'
import { HomeGetStarted } from '../../components/Home/HomeGetStarted/HomeGetStarted'
import { HomeHero } from '../../components/Home/HomeHero/HomeHero'
import { HomeMain } from '../../components/Home/HomeMain/HomeMain'
import { HomeQuotes } from '../../components/Home/HomeQuotes/HomeQuotes'

export const Home = () => {
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
