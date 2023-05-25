import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return props.isLoggedIn ? (
    props.currentUser ? (
      <Component {...props} />
    ) : (
      <></>
    )
  ) : (
    <Navigate to='/sign-up' />
  );
}

export default ProtectedRoute;
