/* eslint-disable react/prop-types */
import { useState } from "react";
import { styled } from "styled-components";
import Reviews from "./Reviews";
import { useGetNewProductsQuery } from "../redux/api/admin/productsApiSlice";
import ProductCard from "./ProductCard";
import { devices } from "../../utils/styledConstants";

const ProductTab = ({
  product,
  addReviewHandler,
  rating,
  setRating,
  comment,
  setComment,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const { data: newProducts } = useGetNewProductsQuery();

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <ProductTabWrapper>
      <div className="product-tab-headings">
        <p
          style={{
            color: `${activeTab === 1 ? "white" : "rgba(255, 255, 255, 0.7)"}`,
            fontWeight: `${activeTab === 1 ? "bold" : "normal"}`,
          }}
          onClick={() => handleTabClick(1)}
        >
          Write Your Reveiw
        </p>
        <p
          style={{
            color: `${activeTab === 2 ? "white" : "rgba(255, 255, 255, 0.7)"}`,
            fontWeight: `${activeTab === 2 ? "bold" : "normal"}`,
          }}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </p>
        <p
          style={{
            color: `${activeTab === 3 ? "white" : "rgba(255, 255, 255, 0.7)"}`,
            fontWeight: `${activeTab === 3 ? "bold" : "normal"}`,
          }}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </p>
      </div>
      <div className="product-tab-contents">
        {activeTab === 1 ? (
          <div className="your-review">
            <label htmlFor="rating"> Rating</label>
            <select
              name="rating"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="1">Good</option>
              <option value="2">Amazing</option>
              <option value="3">Fantastic</option>
              <option value="4">Great</option>
              <option value="5">Excptionest</option>
            </select>
            <label htmlFor="comment">Comment</label>
            <textarea
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="submit" type="submit" onClick={addReviewHandler}>
              Submit
            </button>
          </div>
        ) : activeTab === 2 ? (
          <div className="all-reviews">
            {product?.reviews?.map((r) => (
              <div key={r._id}>
                <h4>{r.name}</h4>
                <p>{r.comment}</p>
                <Reviews value={r.rating} />
                <hr />
              </div>
            ))}
          </div>
        ) : (
          <div className="related-products">
            {newProducts?.products?.map((p) => (
              <ProductCard key={p._id} productInfo={p} />
            ))}
          </div>
        )}
      </div>
    </ProductTabWrapper>
  );
};

export default ProductTab;

const ProductTabWrapper = styled.div`
  display: flex;
  margin: auto;
  margin-top: 2rem;
  width: 100%;
  gap: 3rem;

  .product-tab-headings {
    p {
      margin-bottom: 0.9rem;
      cursor: pointer;
    }
  }

  .product-tab-contents {
    width: 70%;
    .your-review {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      gap: 0.1rem;
      select,
      textarea {
        width: 100%;
        background-color: #00000041;
        color: white;
        border: 0.5px solid rgba(255, 255, 255, 0.7);
        outline: none;
        padding: 0.3rem 0;
        padding-left: 0.5rem;
        border-radius: 4px;
      }
      button {
        width: 20%;
        padding: 0.3rem 1rem;
        border-radius: 3px;
        border: none;
        color: white;
        background-color: rgb(219 39 119);
        font-size: 15px;
        cursor: pointer;
        margin-top: 1rem;
      }
    }
    .all-reviews {
      background-color: #00000042;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      div {
        hr {
          width: 90%;
        }
      }
    }
    .related-products {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
  }

  @media ${devices.md} {
    flex-direction: row;
    gap: 1.5rem;
    .product-tab-contents {
      width: 60%;
      .your-review {
        button {
          width: 30%;
        }
      }
    }
  }

  @media ${devices.sm} {
    flex-direction: column;
    gap: 1.5rem;
    .product-tab-headings {
      p {
        font-size: 16px;
      }
    }
    .product-tab-contents {
      width: 100%;
      margin: auto;
      .your-review {
        button {
          width: 30%;
        }
      }
    }
  }
`;
