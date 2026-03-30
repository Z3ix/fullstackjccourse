import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((store) => store.notification);
  console.log("rerendering notifications");
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
