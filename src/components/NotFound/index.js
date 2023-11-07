import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => {
  const nfUrl =
    'https://res.cloudinary.com/dtenfnygk/image/upload/v1699015181/tjnnhungfznqbfj1jtfc.png'

  return (
    <div className="not-found-container">
      <img src={nfUrl} alt="not found" className="not-img" />
      <h1 className="nf-heading"> Page Not Found </h1>
      <p className="nf-para">
        {' '}
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.{' '}
      </p>
      <Link to="/" className="nf-link">
        <button type="button" className="nf-button">
          {' '}
          Go Back to Home{' '}
        </button>
      </Link>
    </div>
  )
}

export default NotFound
