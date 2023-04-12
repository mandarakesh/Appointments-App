// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, favouriteStarClicked} = props
  const {title, date, id, isFavourite} = appointmentDetails

  const dateFormat = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const favouriteImage = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starClicked = () => {
    favouriteStarClicked(id)
  }

  return (
    <li className="list-items">
      <div>
        <p className="title-name">{title}</p>
        <p className="date-text">{dateFormat}</p>
      </div>
      <button
        data-testid="star"
        onClick={starClicked}
        type="button"
        className="image-button"
      >
        <img className="star-image" alt="star" src={favouriteImage} />
      </button>
    </li>
  )
}
export default AppointmentItem
