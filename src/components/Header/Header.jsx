import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="flex ac jb">
        <Link to="/">Logo</Link>
        <nav className="flex jb">
          <NavLink className="add-board-btn" to="/create-modal" exact>+</NavLink>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/board">Board</NavLink>
          <NavLink to="/stats">Stats</NavLink>
        </nav>
    </header>
  )
}
