import { NavLink } from 'react-router-dom';
import facebookImg from '../../../assets/icon-facebook.svg';
import linkedinImg from '../../../assets/icon-linkedin.svg';
import twitterImg from '../../../assets/icon-twitter.svg';


export const HomeFooter = () => {

  return (
    <footer className="main-grid">
      <section className="footer-container">
        <nav>
          <div className="logo-container">
            <div className="logo-div">
              <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z" fill="currentColor"></path></svg>
              <p>Tallo</p>
            </div>
            <div className="routes-container">
              <NavLink className="nav-item" to="/" exact>Home</NavLink>
              <NavLink className="nav-item" to="/board">Board</NavLink>
            </div>
          </div>
          <div className="address">
            <p>987 Hillcrest Lane</p>
            <p>Irvine, CA</p>
            <p>California 92714</p>
            <p>Call Us : 949-833-7432</p>
          </div>
        </nav>
        <div className="right-footer-container">
          <div className="social-container">
            <img src={facebookImg} alt="" />
            <img src={linkedinImg} alt="" />
            <img src={twitterImg} alt="" />
          </div>
          <p>Copyright 2020. All Rights Reserved</p>
        </div>
      </section>
    </footer>
  )
}
