import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Header from '../Header'
import FooterSection from '../FooterSection'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class BookItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    booksList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const bookApi = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(bookApi, options)
    if (response.ok) {
      const data = await response.json()
      const each = data.book_details
      const updatedData = {
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        aboutBook: each.about_book,
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
        aboutAuthor: each.about_author,
      }

      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.fail,
      })
    }
  }

  onClickRetry = () => {
    this.getData()
  }

  renderSuccesView = () => {
    const {booksList} = this.state
    const {
      coverPic,
      title,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = booksList

    return (
      <div className="book-details-item-container">
        <div className="top-book-details-container">
          <img src={coverPic} alt="cover pic" className="book-details-img" />
          <div>
            <h1 className="book-details-title"> {title} </h1>
            <p className="book-details-authorName"> {authorName} </p>
            <div className="book-details-rating-container">
              <p className="book-details-authorName"> Avg Rating </p>
              <BsFillStarFill className="star-img" />
              <p className="rating"> {rating} </p>
            </div>
            <p className="book-details-authorName">
              {' '}
              Status: <span className="readStatus"> {readStatus} </span>{' '}
            </p>
          </div>
        </div>

        <hr className="hr-line" />

        <div className="second-book-details-container">
          <h1 className="book-details-authorName-heading"> About Author </h1>
          <p className="book-details-authorName-para"> {aboutAuthor} </p>

          <h1 className="book-details-authorName-heading"> About Book </h1>
          <p className="book-details-authorName-para"> {aboutBook} </p>
        </div>

        <div className="footer-contaer-md">
          <FooterSection />
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="bookdetails-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailView = () => {
    const faiImgUrl =
      'https://res.cloudinary.com/dtenfnygk/image/upload/v1699015181/auipkwauch7za84w0rto.png'

    return (
      <div className="fail-img-container">
        <img src={faiImgUrl} alt="failure view" className="fail-img" />
        <p className="went-wrong"> Something went wrong. Please try again </p>
        <button type="button" onClick={this.onClickRetry} className="retry">
          Try Again
        </button>
      </div>
    )
  }

  renderItemsApi = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.fail:
        return this.renderFailView()
      case apiStatusConstants.success:
        return this.renderSuccesView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-item-details-main-container">
        <Header />
        <div className="item-details-inner-container">
          {this.renderItemsApi()}

          <div className="footer-container-book-details">
            <FooterSection />
          </div>
        </div>
      </div>
    )
  }
}

export default BookItemDetails
