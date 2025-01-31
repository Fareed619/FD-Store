/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { devices } from "../../utils/styledConstants.js";

const ModalComponent = ({
  updateUsername,
  setUpdateUsername,
  updateEmail,
  setUpdateEmail,
  showModal,
  setShowModal,
  updateUserInformation,
}) => {
  // if (isLoading) {
  //   return (
  //     <BackgroundWrapper showModal={showModal}>
  //       <ModalWrapper>
  //         <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
  //           Update User
  //         </h2>
  //         <Loader />
  //       </ModalWrapper>
  //     </BackgroundWrapper>
  //   );
  // }
  const closeModalHandler = () => {
    setShowModal(false);
  };
  return (
    <BackgroundWrapper showModal={showModal}>
      <ModalWrapper>
        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>Update User</h2>
        <FormModal className="modal-from" onSubmit={updateUserInformation}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={updateUsername}
            onChange={(e) => {
              setUpdateUsername(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={updateEmail}
            onChange={(e) => {
              setUpdateEmail(e.target.value);
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {" "}
            <button type="submit" style={{ background: "green" }}>
              Update
            </button>
            <button type="button" onClick={closeModalHandler}>
              Close
            </button>
          </div>
        </FormModal>
      </ModalWrapper>
    </BackgroundWrapper>
  );
};

export default ModalComponent;

export const ModalWrapper = styled.div`
  background-color: #808080;
  width: 30%;
  height: 40%;
  border-radius: 4px;
  z-index: 9999;
  box-shadow: 0 6px 50px rgba(255, 255, 255, 0.1);
  position: relative;

  @media ${devices.md} {
    width: 60%;
    margin-top:5rem;
  }
  @media ${devices.sm} {
    width: 100%;
    margin-top:5rem;
  }
`;

export const BackgroundWrapper = styled.div`
  position: absolute;
  background-color: transparent;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 999;
  justify-content: center;
  align-items: center;
  display: ${(props) => (props.showModal ? "flex" : "none")};
`;
export const FormModal = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  gap: 0.2rem;

  label {
    margin-top: 0.8rem;
  }

  input {
    width: 70%;
    padding: 4px 5px;
    font-size: 16px;
    border-radius: 4px;
    outline: none;
    border: none;
  }

  button {
    width: 30%;
    margin-top: 2rem;
    padding: 5px;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: rgb(219 39 119);
    font-size: 16px;
    color: white;
  }
`;
