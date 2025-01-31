import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAddReviewMutation,
  useGetProductByIdQuery,
} from "../redux/api/admin/productsApiSlice";
import Loader from "../components/Loader";
import { BASE_URL } from "../redux/constants";
import styled from "styled-components";
import Favorite from "./Favorite";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { FaChessBishop } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import Reviews from "./Reviews";
import { toast } from "react-toastify";
import moment from "moment";
import ProductTab from "./ProductTab";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { devices } from "../../utils/styledConstants";
const ProductDetailes = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [addReview] = useAddReviewMutation();
  const {
    data: product,
    isLoading: loadingProduct,
    refetch,
  } = useGetProductByIdQuery(productId);

  const addReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const productReview = { rating, comment };
      const review = await addReview({ productReview, productId }).unwrap();
      if (review?.error) {
        throw new Error(review?.error);
      }
      toast.success("Review Added");
      refetch();
      setComment("");
      setRating(1);
    } catch (error) {
      toast.error(error?.data?.error);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  if (loadingProduct) {
    return <Loader />;
  }
  return (
    <ProductDetailesWrapper>
      <h3>
        <Link to="/" className="product-detailes-go-back">
          Go Back
        </Link>
      </h3>
      <section className="product-detailes-top">
        <div className="product-detailes-left">
          <img src={`${BASE_URL}${product.image}`} alt="" />
        </div>
        <div className="product-detailes-right">
          <h3>{product.name}</h3>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            exercitationem dolore earum, voluptatibus quo qui modi ipsam sequi
            voluptatem voluptatum?
          </p>
          <h2>$ {product.price}</h2>
          <div className="product-detailes-right-moredetailes">
            <div>
              <p>
                <FaShop /> Brand: {product.brand}
              </p>
              <p>
                <MdOutlineAccessTimeFilled /> Added:{" "}
                {moment(product.createdAt).fromNow()}
              </p>
              <p>
                <FaStar /> Reviwes: {product.numReviews}
              </p>
            </div>
            <div>
              <p>
                <GiStarsStack /> Ratings: {product.rating}
              </p>
              <p>
                <FaChessBishop /> Quantity: {product.quantity}
              </p>
              <p>
                <MdRemoveShoppingCart /> InStock: {product.countInStock}
              </p>
            </div>
          </div>
          <div className="product-detailes-right-addtocart">
            <div>
              <Reviews value={product.rating} />
              <button onClick={addToCartHandler}>Add To Cart</button>
            </div>
            <select
              name="qty"
              id="qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            >
              {[...Array(product?.countInStock)].map((_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <Favorite productInfo={product} />
        </div>
      </section>
      <section className="product-detailes-bottom">
        <ProductTab
          product={product}
          addReviewHandler={addReviewHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
        />
      </section>
    </ProductDetailesWrapper>
  );
};

export default ProductDetailes;
const ProductDetailesWrapper = styled.div`
  width: 88%;
  margin-left: 7rem;
  margin-bottom: 1rem;

  h3 {
    padding: 1rem 0;
    .product-detailes-go-back {
      color: white;
    }
  }

  .product-detailes-top {
    display: flex;
    justify-content: space-between;

    .product-detailes-left {
      width: 45%;
      img {
        width: 100%;
        height: 400px;
        border-radius: 3px;
      }
    }
    .product-detailes-right {
      width: 50%;
      position: relative;
      .description {
        max-width: 80%;
        margin-bottom: 1rem;
        color: #ffffffb2;
      }

      .product-detailes-right-moredetailes {
        width: 60%;
        max-width: 80%;
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        div p {
          margin-bottom: 1rem;
          font-size: 16px;
        }
      }
      .product-detailes-right-addtocart {
        max-width: 75%;
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;

        button {
          padding: 0.3rem 1rem;
          border-radius: 3px;
          border: none;
          color: white;
          background-color: rgb(219 39 119);
          font-size: 15px;
          cursor: pointer;
          margin-top: 1rem;
        }
        select {
          border: 0.4 white solid;
          outline: none;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          width: 13%;
          border-radius: 3px;
          height: 25px;
        }
      }
    }
  }

  .product-detailes-bottom {
    width: 80%;
    margin: auto;
  }

  @media ${devices.lg} {
    margin-left: 5rem;
    .product-detailes-top {
      .product-detailes-left {
        img {
          height: 350px;
        }
      }
      .product-detailes-right {
        .product-detailes-right-moredetailes {
          width: 80%;
        }
        .product-detailes-right-addtocart {
          max-width: 90%;
          select {
            width: 20%;
          }
        }
      }
    }
  }
  @media ${devices.md} {
    margin: auto;
    .product-detailes-top {
      flex-direction: column;

      .product-detailes-left {
        width: 80%;
        margin: auto;
        img {
          height: 300px;
        }
      }
      .product-detailes-right {
        width: 80%;
        margin: auto;
        .description {
          width: 100%;
        }
        .product-detailes-right-moredetailes {
          max-width: 90%;
        }
        .product-detailes-right-addtocart {
          max-width: 90%;
          align-items: center;
        }
      }
    }

    .product-detailes-bottom {
      width: 100%;
      margin: 3rem 0;
    }
  }
  @media ${devices.sm} {
    margin: auto;
    padding-top: 2rem;
    .product-detailes-top {
      flex-direction: column;

      .product-detailes-left {
        width: 100%;
        margin: auto;
        img {
          height: 250px;
        }
      }
      .product-detailes-right {
        width: 100%;
        margin: auto;
        .description {
          width: 100%;
        }
        h2 {
          font-size: 22px;
        }
        .product-detailes-right-moredetailes {
          max-width: 100%;
          width: 100%;
          p {
            font-size: 15px;
          }
        }
        .product-detailes-right-addtocart {
          max-width: 90%;
          align-items: center;
          select {
            width: 25%;
          }
        }
      }
    }

    .product-detailes-bottom {
      width: 100%;
      margin: 3rem 0;
    }
  }
`;
