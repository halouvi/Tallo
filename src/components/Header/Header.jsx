import { Button } from '@material-ui/core'
import { Trash } from 'components/Header/Trash/Trash'
import { useSelector } from 'react-redux'
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom'
import { useToggle } from 'react-use'
import { CardAvatar } from '../Avatars/CardAvatar'
import { CreateBoardModal } from '../CreateBoardModal/CreateBoardModal'
import { usePopover } from '../Popover/Popover'
import { ReactSVG } from 'react-svg'
import { img } from 'assets/img'

import UserMenu from '../Popover/PopoverCmps/Menus/UserMenu'

export const Header = () => {
  const user = useSelector(state => state.userReducer.user)
  const [isModalOpen, toggleModal] = useToggle(false)

  const { push } = useHistory()
  const { pathname } = useLocation()

  const navigate = dest => pathname !== dest && push(dest)

  const isActive = dest => (pathname === dest ? ' active' : '')

  const [togglePopover] = usePopover()

  return (
    <>
      <header className="main-header flex ac jb p6">
        <Link className="logo" to="/">
          <ReactSVG src={img.trelloWhite} className="svg white" />
          <span>Tallo</span>
        </Link>
        <Trash />
        <nav className="gr10">
          {user?._id && (
            <Button size="large" className="trans" onClick={toggleModal}>
              <ReactSVG src={img.plus} className="svg icon white" />
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
