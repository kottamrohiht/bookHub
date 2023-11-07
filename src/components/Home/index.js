import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Slider from 'react-slick'

import Cookies from 'js-cookie'

import Header from '../Header'
import ReactSlick from '../ReactSlick'
import FooterSection from '../FooterSection'

import './index.css'

const apiConstants = {
  loading: 'LOADING',
  fail: 'FAIL',
  success: 'SUCCESS',
  initial: 'inital',
}

class Home extends Component {
  state = {
    topRatedBooks: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiConstants.loading,
    })

    const relatedBooksApi = ' https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(relatedBooksApi, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))

      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.fail,
      })
    }
  }

  onClickRetry = () => {
    this.getData()
  }

  renderSuccessView = () => {
    const {topRatedBooks} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },

        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },

        {
          breakpoint: 400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <ul className="slider-ul-list">
        <Slider {...settings} className="slider">
          {topRatedBooks.map(each => (
            <ReactSlick key={each.id} item={each} />
          ))}
        </Slider>
      </ul>
    )
  }

  renderFailView = () => {
    const faiImgUrl =
      'https://res.cloudinary.com/dtenfnygk/image/upload/v1699015181/auipkwauch7za84w0rto.png'

    return (
      <div className="home-fail-img-container">
        <img src={faiImgUrl} alt="failure view" className="fail-img" />
        <p className="went-wrong"> Something went wrong. Please try again </p>
        <button type="button" onClick={this.onClickRetry} className="retry">
          Try Again
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="home-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.fail:
        return this.renderFailView()
      case apiConstants.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header path="HOME" />
        <div className="home-inner-container">
          <h1 className="home-heading"> Find Your Next Favorite Books? </h1>
          <p className="home-para">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <Link to="/shelf" className="find-books-link-sm">
            <button type="button" className="find-books">
              Find Books
            </button>
          </Link>

          <div className="home-second-container">
            <div className="top-related-button-container">
              <h1 className="top-rated-heading"> Top Rated Books </h1>
              <Link to="/shelf" className="find-books-link">
                <button type="button" className="find-books-button">
                  {' '}
                  Find Books{' '}
                </button>
              </Link>
            </div>
            {this.renderApiStatus()}
          </div>
        </div>
        <div className="footer-container">
          <FooterSection />
        </div>
      </div>
    )
  }
}

export default Home
