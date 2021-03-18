import { useHistory } from 'react-router';
import patternThree from '../../../assets/img/bg-pattern-home-3.svg';


export const HomeGetStarted = () => {
  const history = useHistory();

  const onLogin = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    history.push('/login-signup');
  }

  return (
    <div className="get-started-section main-grid">
      <div className="container">
        <img src={patternThree} alt="" />
        <main>
          <h2>Ready to get started?</h2>
          <button onClick={onLogin}>Login / Signup</button>
        </main>
      </div>
    </div>
  )
}
