import iconCog from '../../../assets/icon-cog.svg';
import iconChart from '../../../assets/icon-chart.svg';
import iconPerson from '../../../assets/icon-person.svg';


export const HomeMain = () => {

  return (
    <div className="main-section main-grid">
      <section className="main-container">
        <div className="design-div"></div>
        <h2>Build &amp; manage distributed teams like no one else.</h2>
        <div className="secondary-container">
          <div className="item-container">
            <img src={iconPerson} alt="" />
            <div className="item-txt">
              <h4>Experienced Individuals</h4>
              <p>Our network is made up of highly experienced professionals who are passionate about what they do.</p>
            </div>
          </div>
          <div className="item-container">
            <img src={iconCog} alt="" />
            <div className="item-txt">
              <h4>Easy to Implement</h4>
              <p>Our processes have been refined over years of implementation meaning our teams always deliver.</p>
            </div>
          </div>
          <div className="item-container">
            <img src={iconChart} alt="" />
            <div className="item-txt">
              <h4>Enhanced Productivity</h4>
              <p>Our customized platform with in-built analytics helps you manage your distributed teams.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
