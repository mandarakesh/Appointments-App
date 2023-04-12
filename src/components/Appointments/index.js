import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleText: '',
    dateText: '',
    isFavouriteButton: false,
    appointmentList: [],
  }

  titleValue = event => {
    this.setState({titleText: event.target.value})
  }

  dateValue = event => {
    this.setState({dateText: event.target.value})
  }

  onSubmitEvent = event => {
    event.preventDefault()
    const {titleText, dateText} = this.state

    const newAppointment = {
      id: uuidv4(),
      title: titleText,
      date: dateText,
      isFavourite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleText: '',
      dateText: '',
    }))
  }

  filterFavouriteStars = () => {
    const {isFavouriteButton} = this.state
    this.setState({isFavouriteButton: !isFavouriteButton})
  }

  filterResults = () => {
    const {appointmentList, isFavouriteButton} = this.state

    if (isFavouriteButton) {
      return appointmentList.filter(eachItem => eachItem.isFavourite === true)
    }
    return appointmentList
  }

  starClicked = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isFavourite: !eachItem.isFavourite}
        }
        return eachItem
      }),
    }))
  }

  render() {
    const {titleText, dateText, isFavouriteButton} = this.state
    const changeButton = isFavouriteButton ? 'buttonEl' : ''
    const result = this.filterResults()

    return (
      <div className="bg-container">
        <div className="appointment-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="large-container">
            <form onSubmit={this.onSubmitEvent}>
              <div>
                <label htmlFor="inputText" className="title">
                  TITLE
                </label>
                <input
                  id="inputText"
                  value={titleText}
                  onChange={this.titleValue}
                  placeholder="Title"
                  className="input-text"
                  type="text"
                />
              </div>

              <div>
                <label htmlFor="dateInput" className="title">
                  DATE
                </label>
                <input
                  id="dateInput"
                  value={dateText}
                  onChange={this.dateValue}
                  placeholder="Title"
                  className="input-text"
                  type="date"
                />
              </div>

              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              className="appointment-image"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>

          <hr className="line" />

          <div className="button-container">
            <h1 className="appointments-text">Appointments</h1>
            <button
              onClick={this.filterFavouriteStars}
              type="button"
              className={`starred-button ${changeButton}`}
            >
              Starred
            </button>
          </div>

          <ul className="appointment-list-container">
            {result.map(eachItem => (
              <AppointmentItem
                favouriteStarClicked={this.starClicked}
                appointmentDetails={eachItem}
                key={eachItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
