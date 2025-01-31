import styled from "styled-components";
import { BASE_URL } from "../../redux/constants";
import { TfiShoppingCart } from "react-icons/tfi";
import { addToCart } from "../../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { devices } from "../../../utils/styledConstants";
import { toast } from "react-toastify";

const ProductShop = ({ productInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    dispatch(addToCart({ ...productInfo, qty: 1 }));
    toast.success("Product Added Successfully");
  };

  return (
    <ProductShopWrapper>
      <img src={`${BASE_URL}${productInfo.image}`} alt="" />
      <p>{productInfo.description}</p>

      <div className="productshop-shop-details">
        <button onClick={() => navigate(`/product/${productInfo._id}`)}>
          Read More
        </button>
        <TfiShoppingCart
          size={23}
          className="shop-icon-buy"
          onClick={handleAddProduct}
        />
      </div>
    </ProductShopWrapper>
  );
};

export default ProductShop;

const ProductShopWrapper = styled.div`
  width: 25%;
  min-width: 240px;
  margin: 15px 0;

  img {
    width: 100%;
    height: 200px;
  }
  p {
    margin: 5px 0;
  }

  .productshop-shop-details {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      background-color: var(--primary-clr-pink);
      color: white;
      padding: 7px 20px;
      border: none;
      outline: none;
      cursor: pointer;
      border-radius: 4px;
    }
    .shop-icon-buy {
      color: var(--primary-clr-pink);
      font-weight: bold;
      cursor: pointer;
    }
  }

  @media ${devices.lg} {
    min-width: 200px;

    img {
      height: 150px;
    }
  }
  @media ${devices.md} {
    min-width: 240px;
    margin-bottom: 10px;

    img {
      height: 200px;
    }
  }
`;
