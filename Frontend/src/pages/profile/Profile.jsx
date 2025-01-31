import styled from "styled-components";
import "./profile.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/profileApiSlice";
import { toast } from "react-toastify";
import { setCredientials } from "../../redux/features/userAuthSlice";
import { devices } from "../../../utils/styledConstants.js";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(userInfo?.username);
  const [email, setEmail] = useState(userInfo?.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateProfileApi, { isLoading }] = useUpdateProfileMutation();
  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const updatedProfile = await updateProfileApi({
        username,
        email,
      }).unwrap();
      if (updatedProfile.error) {
        throw new Error(updatedProfile.error);
      }
      dispatch(setCredientials({ ...updatedProfile }));
      toast.success("Profile Updated");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="profile">
      <CardStyle>
        <h2>Update Your Profile</h2>
        <FormProfile onSubmit={updateProfileHandler}>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="usrname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <button type="submit">
              {isLoading ? "Updating..." : "Update"}{" "}
            </button>
            <button type="button" onClick={() => navigate("/user-orders")}>
              My Orders
            </button>
          </div>
        </FormProfile>
      </CardStyle>
    </div>
  );
};

export default Profile;

export const CardStyle = styled.div`
  width: 30%;

  h2 {
    margin-left: 2rem;
    margin-top: 1rem;
  }

  @media ${devices.xl} {
    width: 40%;
    margin: auto;

    h2 {
      font-size: 23px;
      margin-bottom: 2rem;
      margin-left: 2rem;
    }
  }
  @media ${devices.lg} {
    width: 50%;
    margin: auto;

    h2 {
      font-size: 23px;
      margin-bottom: 2rem;
      margin-left: 2rem;
    }
  }
  @media ${devices.md} {
    width: 70%;
    margin: auto;

    h2 {
      font-size: 23px;
      margin-bottom: 2rem;
      margin-left: 2rem;
    }
  }
  @media ${devices.sm} {
    width: 90%;
    margin: auto;

    h2 {
      font-size: 20px;
      text-align: start;
      margin-bottom: 2rem;
      margin-left: 1.2rem;
    }
  }
`;
export const FormProfile = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 2rem;

  input {
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.3rem 0.8rem;
    border: 1px solid gray;
    background-color: #00000018;
    outline: none;
    border-radius: 3px;
    font-size: 16px;
    color: white;
  }
  label {
    margin-bottom: 0.2rem;
    font-size: 17px;
  }
  button {
    width: 20%;
    height: 2rem;
    font-size: 15px;
    cursor: pointer;
    border-radius: 4px;
    outline: none;
    border: none;
    background-color: rgb(219 39 119);
    color: white;
  }
  div {
    display: flex;
    justify-content: space-between;
  }

  @media ${devices.sm} {
    margin: auto;
    button {
      width: 30%;
    }
  }
`;
