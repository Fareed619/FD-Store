/* eslint-disable react/prop-types */
import { FaLongArrowAltRight } from "react-icons/fa";
import { BASE_URL } from "../redux/constants";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { devices } from "../../utils/styledConstants";

const DisplayProduct = ({ product }) => {
  const navigate = useNavigate();
  return (
    <DisplayProductWrapper>
      <div className="display-product-img-div">
        <img src={`${BASE_URL}${product.image}`} alt="" />
      </div>
      <div className="display-product-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="diplay-product-details-div">
          <button
            onClick={() => navigate(`/admin/updateProduct/${product._id}`)}
          >
            Update <FaLongArrowAltRight />
          </button>
          <span>$ {product.price}</span>
        </div>
      </div>
    </DisplayProductWrapper>
  );
};

export default DisplayProduct;

const DisplayProductWrapper = styled.div`
  display: flex;
  gap: 0.6rem;
  width: 90%;
  min-width: 50%;
  justify-content: center;
  margin-top: 2rem;

  .display-product-img-div {
    /* width:20%; */
    img {
      width: 150px;
      height: 100px;
      border-radius: 4px;
    }
  }

  .display-product-details {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 40%;

    .diplay-product-details-div {
      display: flex;
      justify-content: space-between;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;
        padding: 0.3rem 1rem;
        border: none;
        border-radius: 3px;
        background-color: rgb(219 39 119);
        font-size: 15px;
        color: white;
        cursor: pointer;
      }
      span {
        color: var(--primary-clr-pink);
        font-size: 16px;
      }
    }
  }

  @media ${devices.md} {
    flex-direction: column;
    gap: 0;
    min-width: 80%;

    .display-product-details {
      width: 90%;
    }
  }
`;
