import patternThree from '../../../assets/bg-pattern-home-3.svg';


export const HomeGetStarted = () => {

  return (
    <div className="get-started-section main-grid">
      <div className="container">
        <img src={patternThree} alt="" />
        <main>
          <h2>Ready to get started?</h2>
          <button>contact us</button>
        </main>
      </div>
    </div>
  )
}
