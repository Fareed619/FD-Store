/* eslint-disable react/prop-types */
import styled from "styled-components";
import Favorite from "./Favorite";
import { useNavigate } from "react-router-dom";
import { devices } from "../../utils/styledConstants";

const CardHomeProduct = ({ productInfo }) => {
  const navigate = useNavigate();
  return (
    <ProductCardWrapper>
      <img src={`${productInfo.image}`} alt="" />
      <div className="cardhome-content">
        <p className="cardhome-description"> {productInfo.description}</p>
        <div>
          <button
            onClick={() => {
              navigate(`/product/${productInfo._id}`);
            }}
          >
            Read More
          </button>
          <p>$ {productInfo.price}</p>
        </div>
      </div>
      <Favorite productInfo={productInfo} />
    </ProductCardWrapper>
  );
};

export default CardHomeProduct;

const ProductCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  min-width: 220px;
  position: relative;
  margin-top: 1rem;
  img {
    width: 100%;
    height: 200px;
    border-radius: 4px;
  }
  .cardhome-content {
    margin-bottom: 1rem;
    .cardhome-description {
      margin: 0.5rem 0;
    }
    div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      /* margin-top: 0.4rem; */
      button {
        padding: 0.3rem 1rem;
        border: none;
        border-radius: 30px;
        background-color: rgb(219 39 119);
        color: white;
        font-size: 17px;
        cursor: pointer;
      }
      p {
        color: rgb(219 39 119);
      }
    }
  }

  @media ${devices.lg} {
    width: 40%;
    margin: auto;

    .cardhome-content {
      div {
        p {
          font-size: 15px;
        }
        button {
          font-size: 14px;
        }
      }
    }
  }
  @media ${devices.md} {
    width: 40%;
    margin: auto;

    .cardhome-content {
      div {
        p {
          font-size: 15px;
        }
        button {
          font-size: 14px;
        }
      }
    }
  }
  @media ${devices.sm} {
    width: 90%;
    margin: auto;
    max-width: 300px;

    .cardhome-content {
      div {
        p {
          font-size: 15px;
        }
        button {
          font-size: 14px;
        }
      }
    }
  }
`;
