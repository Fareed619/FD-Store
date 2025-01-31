/* eslint-disable react/prop-types */
import styled from "styled-components";
import Favorite from "./Favorite";
import { BASE_URL } from "../redux/constants";
import { devices } from "../../utils/styledConstants";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ productInfo }) => {
  const navigate = useNavigate();
  return (
    <ProductWrapper>
      <div className="product-card-div">
        <img src={`${BASE_URL}${productInfo?.image}`} alt="" />

        <p>{productInfo?.description}</p>
        <div className="product-card-div-bottom">
          <button
            onClick={() => {
              navigate(`/product/${productInfo._id}`);
            }}
          >
            Read More
          </button>
          <span>{productInfo?.price}$</span>
        </div>
      </div>
      <Favorite productInfo={productInfo} />
    </ProductWrapper>
  );
};

export default ProductCard;

const ProductWrapper = styled.div`
  position: relative;
  width: 15rem;

  .product-card-div {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.2rem;
    border-radius: 3px;

    img {
      width: 100%;
      height: 130px;
      border-radius: 4px;
    }
    .product-card-div-bottom {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.6rem;

      button {
        padding: 0 1rem;
        border-radius: 3px;
        border: none;
        color: white;
        background-color: rgb(219 39 119);
        font-size: 15px;
        cursor: pointer;
      }
      span {
        color: rgb(219 39 119);
      }
    }
  }
  @media ${devices.xl} {
    width: 18rem;
    .product-card-div {
      .product-card-div-bottom {
        button {
          padding: 0.2rem 1.5rem;
        }
      }
    }
  }
`;
