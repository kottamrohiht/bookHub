import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookshefBooks = props => {
  const {item} = props
  const {id, coverPic, title, authorName, rating, readStatus} = item

  return (
    <Link to={`/books/${id}`} className="bookshelf-link-el">
      <li className="each-book">
        <img src={coverPic} alt={title} className="cover-pic" />
        <div className="list-second-container">
          <h1 className="title"> {title} </h1>
          <p className="authorName"> {authorName} </p>
          <div className="rating-container">
            <p className="rating-avg"> Avg Rating </p>
            <BsFillStarFill className="BsFillStarFill" />
            <p className="rating-avg"> {rating} </p>
          </div>
          <p className="read-Status">
            Status:
            <span className="readStatusEl"> {readStatus} </span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookshefBooks
