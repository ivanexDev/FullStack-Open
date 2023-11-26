/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Notification = ({ message }) => {
  const messageColor = message?.split(" ")[0] === "Added" ? "confirm" : "error"

    if (message === null) {
      return null
    }
  
    return (
      <div className={messageColor}>
        {message}
      </div>
    )
  }

export default Notification