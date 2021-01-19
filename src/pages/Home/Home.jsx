import { HomeFooter } from "../../components/Home/HomeFooter/HomeFooter"
import { HomeGetStarted } from "../../components/Home/HomeGetStarted/HomeGetStarted"
import { HomeHero } from "../../components/Home/HomeHero/HomeHero"
import { HomeMain } from "../../components/Home/HomeMain/HomeMain"
import { HomeQuotes } from "../../components/Home/HomeQuotes/HomeQuotes"


export const Home = (props) => {

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