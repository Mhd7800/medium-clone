import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useLocation, Navigate} from "react-router-dom";
import { selectCurrentToken } from "../features/authSlice";

function PrivateRoute({ children }) {
  const user = useSelector(selectUser);
  const token = useSelector(selectCurrentToken)
  const location = useLocation();

  if (user || token) {
    return children;
  } else {
    return <Navigate to="/getting-started" />;
  }

}

export default PrivateRoute;