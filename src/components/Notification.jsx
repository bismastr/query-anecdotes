import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const notificationValue = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notificationValue == null) {
    return null
  }

  return (
    <div style={style}>
      {notificationValue}
    </div>
  )
}

export default Notification
