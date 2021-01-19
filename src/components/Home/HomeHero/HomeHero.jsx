import leftImg from '../../../assets/bg-pattern-home-1.svg';
import rightImg from '../../../assets/bg-pattern-home-2.svg';


export const HomeHero = () => {

  return (
    <div className="hero-section">
      <img className="left-img" src={leftImg} alt="" />
      <div className="hero-title">
        <h1>Find the</h1>
        <h1>best <span>talent</span></h1>
      </div>
      <div className="side-container">
        <div></div>
        <p>
          Finding the right people and building high performing teams can be hard.
          Most companies aren’t tapping into the abundance of global talent. We’re
          about to change that.
      </p>
        <img className="right-img" src={rightImg} alt="" />
      </div>
    </div>
  )
}
