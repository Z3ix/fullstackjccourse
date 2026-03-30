import { useContext } from "react";
import { useSelector } from "react-redux";
import { NotificationContext } from "../contexts";



const Notification = () => {
  const {notification} = useContext(NotificationContext)
  console.log('rerendering notifications')
  return (
    <>
      <Info info={notification.info.message} />
      <Error error={notification.error.message} />
    </>
  );
};

const Error = ({ error }) => {
  if (error) return <div className="error">{error}</div>;
};

const Info = ({ info }) => {
  if (info) return <div className="info">{info}</div>;
};

export default Notification;
