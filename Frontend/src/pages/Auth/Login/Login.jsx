import "./login.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "../../../components/components.style";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../../redux/api/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredientials } from "../../../redux/features/userAuthSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    try {
      const userInfoRecieved = await login(formData).unwrap();
      dispatch(setCredientials(userInfoRecieved));
      toast.success("Logged in successfuly");
      navigate("/");
    } catch (error) {
      error.data.errors.map((err) => toast.error(err.msg));
    }
  };

  return (
    <LoginDiv className="login">
      <div className="login-container">
        <h2 style={{ paddingBottom: "50px", fontSize: "28px" }}>Login</h2>
        <LoginForm onSubmit={loginSubmit}>
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button type="submit">
            {isLoading ? "Signing in...." : "Sign in"}
          </Button>
          <p className="login-para">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "rgb(219 39 119)", fontSize: "17px" }}
            >
              sign up
            </Link>
          </p>
        </LoginForm>
      </div>
    </LoginDiv>
  );
};

export default Login;

export const LoginDiv = styled.div`
  background-color: #000000de;
  color: white;
  height: 100vh;
`;
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 4px;
`;
