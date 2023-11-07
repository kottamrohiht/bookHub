import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'

import HeaderItems from '../HeaderItems'

import './index.css'

const options = [
  {
    id: 'HOME',
    displayText: 'Home',
    path: '/',
  },
  {
    id: 'BOOKSHELVES',
    displayText: 'Bookshelves',
    path: '/shelf',
  },
]

class Header extends Component {
  state = {
    showNav: false,
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')

    const {history} = this.props
    history.replace('/login')
  }

  onClickMenu = () => {
    this.setState(prevState => ({
      showNav: !prevState.showNav,
    }))
  }

  render() {
    const {showNav} = this.state
    const navCss = showNav ? 'show-nav' : 'hide-nav'
    const {path} = this.props

    const bookHub =
      'https://res.cloudinary.com/dtenfnygk/image/upload/v1698247802/gbvjhyvjvls6ymql2wgt.png'
    return (
      <div className="header-main-container">
        <Link to="/" className="book-img-link">
          <img src={bookHub} alt=" website logo" className="header-book-hub" />
        </Link>

        <button
          onClick={this.onClickMenu}
          type="button"
          className="trigger-button"
        >
          <GiHamburgerMenu />
        </button>

        <div className={`'popup-container-sm' ${navCss} `}>
          <ul className="nav-container">
            {options.map(each => (
              <HeaderItems
                key={each.id}
                item={each}
                isActive={each.id === path}
              />
            ))}

            <button
              onClick={this.onClickLogout}
              type="button"
              className="logout"
            >
              Logout
            </button>
            <button onClick={this.onClickMenu} type="button" className="cancel">
              <MdCancel />
            </button>
          </ul>
        </div>

        <nav className="header-link-md-container">
          <ul className="header-items-container">
            {options.map(each => (
              <HeaderItems
                key={each.id}
                item={each}
                isActive={path === each.id}
              />
            ))}
          </ul>
          <button
            onClick={this.onClickLogout}
            type="button"
            className="logout-md"
          >
            Logout
          </button>
        </nav>
      </div>
    )
  }
}

export default withRouter(Header)
