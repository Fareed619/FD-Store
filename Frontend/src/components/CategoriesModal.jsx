/* eslint-disable react/prop-types */
import styled from "styled-components";
import { ModalWrapper, BackgroundWrapper, FormModal } from "./ModalComponent";

const CategoriesModal = ({
  showModal,
  setShowModal,
  setUpdateName,
  updateName,
  updateNameHandler,
  deleteCategoryHandler,
}) => {
  const closeModalHandler = () => {
    setShowModal(false);
  };
  return (
    <BackgroundWrapper showModal={showModal}>
      <ModalWrapper>
        <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
          Update Category
        </h2>
        <div
          onClick={() => {
            setShowModal(false);
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            color: "black",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          X
        </div>
        <FormModal onSubmit={updateNameHandler}>
          <label htmlFor="username">Category Name</label>
          <input
            type="text"
            name="name"
            value={updateName}
            onChange={(e) => {
              setUpdateName(e.target.value);
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {" "}
            <button type="submit" style={{ background: "green" }}>
              Update
            </button>
            <button type="submit" onClick={deleteCategoryHandler}>
              Delete
            </button>
          </div>
        </FormModal>
      </ModalWrapper>
    </BackgroundWrapper>
  );
};

export default CategoriesModal;
