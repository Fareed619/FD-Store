import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input } from "../../../components/components.style";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/api/authApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredientials } from "../../../redux/features/userAuthSlice";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);
  const submitRegister = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      email,
      password,
    };
    try {
      const userInfoReceived = await register(formData).unwrap();
      dispatch(setCredientials(userInfoReceived));
      toast.success("Registerd successfuly");
      navigate("/");
    } catch (error) {
      error.data.errors.map((err) => toast.error(err.msg));
    }
  };

  return (
    <RegisterDiv>
      <div style={{ width: "80%", margin: "auto", paddingTop: "50px" }}>
        <h2 style={{ paddingBottom: "50px", fontSize: "28px" }}>Sign Up</h2>
        <RegisterForm onSubmit={submitRegister}>
          <label className="reg-label" htmlFor="username">
            Username
          </label>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <label className="reg-label" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <label className="reg-label" htmlFor="password">
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
            {isLoading ? "Singing up..." : "Sign up"}
          </Button>
          <p className="register-para">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "rgb(219 39 119)", fontSize: "17px" }}
            >
              sign in
            </Link>
          </p>
        </RegisterForm>
      </div>
    </RegisterDiv>
  );
};

export default Register;

export const RegisterDiv = styled.div`
  background-color: #000000de;
  height: 100vh;
  color: white;
`;
export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  gap: 4px;
`;
