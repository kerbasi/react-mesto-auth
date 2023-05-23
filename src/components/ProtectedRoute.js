import { useNavigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  const navigate = useNavigate();
  console.log(props.isLoggedIn);
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    navigate("/sign-in", { replace: true })
  );
}

export default ProtectedRoute;
