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
    <h1 className="contact-us"> Contact Us </h1>
  </div>
)

export default FooterSection
