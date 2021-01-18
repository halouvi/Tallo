import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
  const { user } = useSelector(state => state.userReducer) || {}

  return (
    <header className="flex ac jb">
      <Link className="logo-container" to="/">
        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z" fill="currentColor"></path></svg>
        <p>Tallo</p>
      </Link>
      <div className="nav-container flex">
        <nav className="flex jb">
          <NavLink className="add-board-btn nav-item" to="/create-modal" exact>+</NavLink>
          <NavLink className="nav-item" to="/" exact>Home</NavLink>
          <NavLink className="nav-item" to="/board">Board</NavLink>
          <NavLink className="nav-item" to="/stats">Stats</NavLink>
        </nav>
        <div className="user-container">
          {user?.imgUrl ? <img src={user.imgUrl} alt="" /> : <svg class="MuiSvgIcon-root MuiAvatar-fallback" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z">
            </path>
          </svg>}
        </div>
      </div>
    </header>
  )
}
