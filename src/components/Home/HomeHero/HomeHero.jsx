import leftImg from '../../../assets/bg-pattern-home-1.svg';
import rightImg from '../../../assets/bg-pattern-home-2.svg';


export const HomeHero = () => {

  return (
    <div className="hero-section">
      <img className="left-img" src={leftImg} alt="" />
      <div className="hero-title">
        <h1>Manage the</h1>
        <h1>best <span>projects</span></h1>
      </div>
      <div className="side-container">
        <div></div>
        <p>
        Tallo helps teams work more collaboratively and get more done.
        Tallo’s boards, lists, and cards enable teams to organize and prioritize projects in a fun,
         flexible, and rewarding way.
      </p>
        <img className="right-img" src={rightImg} alt="" />
      </div>
    </div>
  )
}
