import './index.css'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const FooterSection = () => (
  <div className="footer-main-container">
    <ul className="ul-button-container">
      <li className="social-list-item">
        <button type="button" className="social-button">
          <FaGoogle />
        </button>
      </li>

      <li className="social-list-item">
        <button type="button" className="social-button">
          <FaTwitter />
        </button>
      </li>

      <li className="social-list-item">
        <button type="button" className="social-button">
          <FaInstagram />
        </button>
      </li>

      <li className="social-list-item">
        <button type="button" className="social-button">
          <FaYoutube />
        </button>
      </li>
    </ul>
    <p className="contact-us">Contact us</p>
  </div>
)

export default FooterSection
