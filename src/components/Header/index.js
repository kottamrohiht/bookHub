import {Component} from 'react'
import {Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import {GiHamburgerMenu} from 'react-icons/gi'
import {MdCancel} from 'react-icons/md'

import './index.css'

const options = [
  {
    id: 'HOME',
    displayText: 'Home',
  },
  {
    id: 'BOOKSHELVES',
    displayText: 'Bookshelves',
  },
]

class Header extends Component {
    
  render() {
    const bookHub =
      'https://res.cloudinary.com/dtenfnygk/image/upload/v1698247802/gbvjhyvjvls6ymql2wgt.png'
    return (
      <div className="header-main-container">
        <Link to="/" className="book-img-link">
          <img src={bookHub} alt="book hub" className="header-book-hub" />
        </Link>

        <div className="popup-container">
          <Popup
            modal
            trigger={
              <button type="button" className="trigger-button">
                <GiHamburgerMenu />
              </button>
            }
          >
            {close => (
              <div className="nav-container">
                <Link to="/" className="header-link">
                  <li className="link-el"> Home </li>
                </Link>

                <Link to="/" className="header-link">
                  <li className="link-el"> Bookshelves </li>
                </Link>

                <button type="button" className="logout">
                  Logout
                </button>
                <button
                  onClick={() => close()}
                  type="button"
                  className="cancel"
                >
                  <MdCancel />
                </button>
              </div>
            )}
          </Popup>
        </div>

        <div className="header-link-md-container">
          <Link to="/" className="book-img-link">
            <li className="link-el"> Home </li>
          </Link>

          <Link to="/" className="book-img-link">
            <li className="link-el"> Bookshelves </li>
          </Link>

          <button type="button" className="logout-md">
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default Header
