import {Component} from 'react'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-main-container">
        <Header />
        <h1 className="home"> Home </h1>
      </div>
    )
  }
}

export default Home
