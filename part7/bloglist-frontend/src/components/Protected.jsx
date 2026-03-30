import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Protected = () => {
  const user = useSelector((state) => state.user);

  if (!user.user) return null;

  return <Outlet />;
};

export default Protected;
