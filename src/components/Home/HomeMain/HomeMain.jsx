import iconCog from '../../../assets/icon-cog.svg';
import iconChart from '../../../assets/icon-chart.svg';
import iconPerson from '../../../assets/icon-person.svg';


export const HomeMain = () => {

  return (
    <div className="main-section main-grid">
      <section className="main-container">
        <div className="design-div"></div>
        <h2>Build &amp; manage your projects any time, anywhere.</h2>
        <div className="secondary-container">
          <div className="item-container">
            <img src={iconPerson} alt="" />
            <div className="item-txt">
              <h4>Work with any team</h4>
              <p>Whether it’s for work, a side project or even the next family vacation, Tallo helps your team stay organized.</p>
            </div>
          </div>
          <div className="item-container">
            <img src={iconCog} alt="" />
            <div className="item-txt">
              <h4>Always In Sync</h4>
              <p>No matter where you are, Tallo stays in sync across all of your devices. Collaborate with your team anywhere.</p>
            </div>
          </div>
          <div className="item-container">
            <img src={iconChart} alt="" />
            <div className="item-txt">
              <h4>Information at a glance</h4>
              <p>Dive into the details by adding attachments, due dates, and more directly to Tallo cards. Collaborate on projects from beginning to end.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
