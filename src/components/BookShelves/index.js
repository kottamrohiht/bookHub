import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Header from '../Header'
import ShelfOptions from '../ShelfOptions'
import BookshefBooks from '../BookshefBooks'
import FooterSection from '../FooterSection'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class BookShelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userInput: '',
    selectedOption: bookshelvesList[0].value,
    booksList: [],
    activeHeading: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })

    const {selectedOption, userInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const bookApi = `https://apis.ccbp.in/book-hub/books?shelf=${selectedOption}&search=${userInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(bookApi, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
      }))

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

  onClickSearch = () => {
    this.getData()
  }

  updateSelectedOptions = option => {
    const {label, value} = option
    this.setState(
      {
        selectedOption: value,
        activeHeading: label,
      },
      this.getData,
    )
  }

  onChangeUserinput = event => {
    this.setState({
      userInput: event.target.value,
    })
  }

  onClickRetry = () => {
    this.getData()
  }

  renderSuccesView = () => {
    const {booksList, userInput} = this.state
    const booksListLen = booksList.length
    const noResult =
      'https://res.cloudinary.com/dtenfnygk/image/upload/v1699015181/ptdhu3oxjtqh5htvvf3f.png'

    return (
      <div className="render-success-container-shelf">
        {booksListLen === 0 ? (
          <div className="no-result-container">
            <img src={noResult} alt="no books" className="no-result" />
            <p className="no-result-para">
              Your search for {userInput} did not find any matches.
            </p>
          </div>
        ) : (
          <div testid="bookItem">
            <ul testid="bookItem" className="each-book-item-container">
              {booksList.map(each => (
                <BookshefBooks key={each.id} item={each} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="bookshelf-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailView = () => {
    const faiImgUrl =
      'https://res.cloudinary.com/dtenfnygk/image/upload/v1699015181/auipkwauch7za84w0rto.png'

    return (
      <div className="bookshel-fail-img-container">
        <img src={faiImgUrl} alt="failure view" className="fail-img" />
        <p className="went-wrong"> Something went wrong. Please try again </p>
        <div testid="try again">
          <button
            testid="try again"
            type="button"
            onClick={this.onClickRetry}
            className="retry"
          >
            Try Again
          </button>
        </div>
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
    const {userInput, selectedOption, activeHeading} = this.state

    return (
      <div className="bookshelves-main-container">
        <Header path="BOOKSHELVES" />
        <div className="bookshelf-inner-container">
          <div className="shelf-fist-container">
            <div data-testid="searchButton" className="shelf-input-container">
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeUserinput}
                value={userInput}
                className="inputEl"
              />
              <div testid="searchButton" className="searchButton">
                <button
                  testid="searchButton"
                  onClick={this.onClickSearch}
                  type="button"
                  className="search-icon-container"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <h1 className="shelf-heading"> Bookshelves </h1>
            <ul className="shelf-options-container">
              {bookshelvesList.map(each => (
                <ShelfOptions
                  key={each.id}
                  item={each}
                  isSelected={selectedOption === each.value}
                  updateSelectedOptions={this.updateSelectedOptions}
                />
              ))}
            </ul>
          </div>

          <div className="bookShelves-md-options-container">
            <h1 className="bookshelves-heading"> Bookshelves </h1>
            <ul className="shelf-options-md-container">
              {bookshelvesList.map(each => (
                <ShelfOptions
                  key={each.id}
                  item={each}
                  isSelected={selectedOption === each.value}
                  updateSelectedOptions={this.updateSelectedOptions}
                />
              ))}
            </ul>
          </div>

          <div className="shelf-second-container">
            <div className="search-md-container">
              <h1 className="all-books"> {activeHeading} Books </h1>

              <div data-testid="searchButton" className="shelf-input-container">
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeUserinput}
                  value={userInput}
                  className="inputEl"
                />
                <div className="searchButton" testid="searchButton">
                  <button
                    testid="searchButton"
                    onClick={this.onClickSearch}
                    type="button"
                    className="search-icon-container"
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
            </div>

            {this.renderItemsApi()}

            <div className="shelf-footer-md-container">
              <FooterSection />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
