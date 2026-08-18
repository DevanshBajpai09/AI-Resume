import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../app/Features/authSlice";
import toast from "react-hot-toast";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");

    if (!token) {
      toast.error("Authentication failed");
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    dispatch(
      login({
        token,
      })
    );

    toast.success("Login successful");

    navigate("/app");
  }, [dispatch, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Signing you in...
    </div>
  );
};

export default OAuthSuccess;