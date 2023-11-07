import {Link} from 'react-router-dom'

import './index.css'

const ReactSlick = props => {
  const {item} = props
  const {id, authorName, coverPic, title} = item

  return (
    <Link to={`/books/${id}`} className="slider-main-item-container">
      <li className="each-slider-item">
        <img src={coverPic} alt={title} className="t-rated-book" />
        <h1 className="t-rated-heading"> {title} </h1>
        <p className="t-rated-para"> {authorName} </p>
      </li>
    </Link>
  )
}

export default ReactSlick
