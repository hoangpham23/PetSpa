import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserAuth = (allowedRoles) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!allowedRoles.includes(role)) {
      navigate("/sign-in");
    }
  }, [allowedRoles, navigate]);
};

export default UserAuth;
