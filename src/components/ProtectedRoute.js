import { useNavigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  const navigate = useNavigate();

  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    navigate("/sign-in", { replace: true })
  );
}

export default ProtectedRoute;
