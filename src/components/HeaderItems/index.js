import {Link} from 'react-router-dom'

import './index.css'

const HeaderItems = props => {
  const {item, isActive} = props
  const {displayText, path} = item

  const activeCss = isActive ? 'active' : ''

  return (
    <Link to={path} className="header-link">
      <li className={`header-link-el ${activeCss}`}>
        <nav>{displayText}</nav>
      </li>
    </Link>
  )
}

export default HeaderItems
