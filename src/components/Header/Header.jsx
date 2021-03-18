import { Button } from '@material-ui/core'
import { Trash } from 'components/Header/Trash/Trash'
import { useSelector } from 'react-redux'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import { useToggle } from 'react-use'
import { CardAvatar } from '../Avatars/CardAvatar'
import { CreateBoardModal } from '../CreateBoardModal/CreateBoardModal'
import { usePopover } from '../Popover/Popover'
import { ReactSVG } from 'react-svg'
import plus from 'assets/+.svg'

import UserMenu from '../Popover/PopoverCmps/Menus/UserMenu'

export const Header = () => {
  const user = useSelector(state => state.userReducer.user)
  const [isModalOpen, toggleModal] = useToggle(false)

  const { push } = useHistory()
  const { pathname } = useLocation()

  const navigate = dest => pathname !== dest && push(dest)

  const isActive = dest => (pathname === dest ? ' active' : '')

  const { togglePopover } = usePopover()

  return (
    <>
      <header className="main-header flex ac jb p6">
        <Link className="logo" to="/">
          <svg role="presentation" focusable="false" viewBox="0 0 22 22">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 1a1 1 0 011-1h4a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm9-1a1 1 0 00-1 1v6a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z"
              fill="currentColor"></path>
          </svg>
          <span>Tallo</span>
        </Link>
        <Trash />
        <nav className="gr10">
          {user?._id && (
            <Button size="large" className="trans" onClick={toggleModal}>
              <ReactSVG src={plus} className="svg white" />
            </Button>
          )}
          <Button
            size="large"
            className={`navlink trans${isActive('/')}`}
            onClick={() => navigate('/')}>
            Home
          </Button>
          <Button
            size="large"
            className={`navlink trans${isActive('/board')}`}
            onClick={() => navigate('/board')}>
            Board
          </Button>
          <Button className="user-btn trans" onClick={ev => togglePopover(ev, UserMenu)}>
            {user && <CardAvatar user={user} />}
          </Button>
        </nav>
      </header>
      {isModalOpen && <CreateBoardModal toggleModal={toggleModal} />}
    </>
  )
}
