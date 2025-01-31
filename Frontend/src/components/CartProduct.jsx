/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa";
import { BASE_URL } from "../redux/constants";
import { styled } from "styled-components";
import { devices } from "../../utils/styledConstants";

const CartProduct = ({ item, addToCartHandler, removeFromCartHandler }) => {
  return (
    <CartWrapper key={item._id}>
      <div className="cartproduct-content-left">
        <img src={`${BASE_URL}${item.image}`} alt="" />
        <div>
          <p>{item.name}</p>
          <h4>{item.brand}</h4>
          <h3> $ {item.price}</h3>
        </div>
      </div>
      <div className="cartproduct-content-right">
        <select
          value={item.qty}
          onChange={(e) => addToCartHandler(item, Number(e.target.value))}
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>

        <FaTrash
          onClick={() => removeFromCartHandler(item._id)}
          className="cartproduct-trash"
        />
      </div>
    </CartWrapper>
  );
};

export default CartProduct;

export const CartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;

  .cartproduct-content-left {
    display: flex;
    gap: 0.6rem;

    img {
      width: 8rem;
      height: 5rem;
      border-radius: 4px;
    }

    div {
      h4 {
        margin: 0.7rem 0;
      }
      p {
        color: var(--primary-clr-pink);
      }
    }
  }

  .cartproduct-content-right {
    select {
      border: 0.4 white solid;
      outline: none;
      background-color: rgba(0, 0, 0, 0.225);
      color: white;
      width: 4.4rem;
      border-radius: 3px;
      height: 25px;
    }

    .cartproduct-trash {
      color: #ff0000b7;
      margin-left: 1rem;
      cursor: pointer;
    }
  }

  @media ${devices.xs}{
    flex-direction:column;
    gap: 2rem;

  }
`;
