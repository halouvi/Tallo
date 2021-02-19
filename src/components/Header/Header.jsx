import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { useToggle } from 'react-use'
import { CreateBoardModal } from '../Board/CreateBoardModal/CreateBoardModal'
import UserMenu from './UserMenu/UserMenu'

export const Header = () => {
  const { user } = useSelector(state => state.userReducer) || {}
  const [isModalOpen, toggleModal] = useToggle(false)

  return (
    <>
      <header className="main-header flex ac jb">
        <Link className="logo-container" to="/">
          <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z"
              fill="currentColor"></path>
          </svg>
          <p>Tallo</p>
        </Link>
        <div className="nav-container flex">
          <nav className="flex jb">
            {user?._id && (
              <button className="add-board-btn nav-item" onClick={toggleModal}>
                <svg width="512" height="512" viewBox="0 0 448 448">
                  <g>
                    <path
                      d="m408 184H272c-4.417969.0-8-3.582031-8-8V40c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8H40c-22.089844.0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969.0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40V272c0-4.417969 3.582031-8 8-8h136c22.089844.0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"
                      fill="#fff"
                      data-original="#000000"
                    />
                  </g>
                </svg>
              </button>
            )}
            <NavLink className="nav-item" to="/" exact>
              Home
            </NavLink>
            <NavLink className="nav-item" to="/board">
              Board
            </NavLink>
          </nav>
          <UserMenu user={user}></UserMenu>
        </div>
      </header>
      {isModalOpen && <CreateBoardModal toggleModal={toggleModal} />}
    </>
  )
}
