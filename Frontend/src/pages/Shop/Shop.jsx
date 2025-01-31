import { useGetFilterdProuductsQuery } from "../../redux/api/admin/productsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCategoriesQuery } from "../../redux/api/admin/categoriesApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../../redux/features/shopSlice";
import { IoIosArrowDropleft } from "react-icons/io";
import { useEffect, useState } from "react";

import styled from "styled-components";
import Loader from "../../components/Loader";
import { MdFilterList } from "react-icons/md";

import { devices } from "../../../utils/styledConstants";
import ProductShop from "./ProductShop";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useGetAllCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [showFilterlist, setShowFilterList] = useState(false);

  const filterdProductsQuery = useGetFilterdProuductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery?.data));
    }
  }, [categoriesQuery, categoriesQuery?.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filterdProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filterProducts = filterdProductsQuery.data.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
        );

        dispatch(setProducts(filterProducts));
      }
    }
  }, [checked, radio, filterdProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filterdProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleChecked = (value, id) => {
    const updateChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);

    dispatch(setChecked(updateChecked));
  };

  const uniqueBarnds = [
    ...Array.from(
      new Set(
        filterdProductsQuery.data
          ?.map((p) => p.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlerPriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <ShopWrapper showFilterlist={showFilterlist}>
      {!showFilterlist && (
        <div
          className="shop-filter-filter-smallscreens"
          onClick={() => setShowFilterList(true)}
        >
          <MdFilterList size={24} />
          <span>Filter</span>
        </div>
      )}

      <section className="shop-filter-section">
        <IoIosArrowDropleft
          className="shop-filter-close-arrow"
          onClick={() => setShowFilterList(false)}
          size={23}
        />
        <div className="shop-filter-container">
          <p>Filter By Categories</p>
          {categories?.categories?.map((c) => (
            <div key={c._id}>
              <input
                type="checkbox"
                onChange={(e) => handleChecked(e.target.checked, c._id)}
              />
              <label>{c.name}</label>
            </div>
          ))}
        </div>
        <div className="shop-filter-container">
          <p>Filter By Brands</p>
          {uniqueBarnds?.map((brand) => (
            <div key={brand._id}>
              <input
                type="radio"
                id={brand}
                name="brand"
                onChange={() => {
                  handleBrandClick(brand);
                }}
              />
              <label> {brand}</label>
            </div>
          ))}
        </div>
        <div className="shop-filter-container">
          <p>Filter By Price</p>
          <div className="shop-filter-con-price">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlerPriceChange}
            />
            <button onClick={() => window.location.reload()}>Reset</button>
          </div>
        </div>
      </section>

      <section className="shop-show-products">
        <h3>{products?.length} Products</h3>
        <div className="shop-show-products-container">
          {products.length === 0 ? (
            <Loader />
          ) : (
            products?.map((product) => (
              <ProductShop key={product._id} productInfo={product} />
            ))
          )}
        </div>
      </section>
    </ShopWrapper>
  );
};

export default Shop;

const ShopWrapper = styled.div`
  width: 90%;
  margin-left: 5rem;
  padding-top: 1rem;
  display: flex;
  gap: 2rem;

  .shop-filter-filter-smallscreens {
    display: none;
  }
  .shop-filter-section {
    width: 20%;
    background-color: #00000024;
    height: 100%;
    border-radius: 5px;
    .shop-filter-close-arrow {
      display: none;
    }
    .shop-filter-container {
      width: 85%;
      margin: auto;
      padding: 0.5rem 0;
      div {
        padding-left: 1rem;

        input {
          margin: 0.4rem 0;
        }
        label {
          margin-left: 0.3rem;
        }
      }

      p {
        background-color: #0000008c;
        text-align: center;
        padding: 0.3rem 0.7rem;
        border-radius: 20px;
        margin: 0.6rem 0;
      }
      .shop-filter-con-price {
        input {
          width: 95%;
          padding: 0.5rem;
          border-radius: 4px;
          background-color: #00000038;
          border: 1px solid gray;
          color: white;
        }

        button {
          width: 95%;
          margin-top: 2rem;
          color: white;
          background-color: #00000038;
          outline: none;
          padding: 0.4rem;
          cursor: pointer;
          border: 1px solid gray;
          border-radius: 4px;
        }
      }
    }
  }

  .shop-show-products {
    width: 80%;

    .shop-show-products-container {
      display: flex;
      flex-wrap: wrap;
      column-gap: 2rem;
    }
  }

  @media ${devices.lg} {
    .shop-filter-section {
      width: 25%;
    }

    .shop-show-products {
      width: 60%;
    }
  }

  @media ${devices.md} {
    width: 100%;
    margin: 0;
    gap: 1rem;
    flex-direction: column;
    margin-top: 2rem;

    .shop-filter-filter-smallscreens {
      display: block;
      background-color: #00000020;
      width: 15rem;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.3rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      border: 1px solid gray;
    }
    .shop-filter-section {
      display: ${(props) => (props.showFilterlist ? "block" : "none")};
      position: fixed;
      z-index: 99999;
      width: 15rem;
      background-color: #000000d6;

      .shop-filter-close-arrow {
        display: inline;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }

      .shop-filter-container {
        width: 90%;
        p {
          background-color: #00000069;
        }
      }
    }
    .shop-show-products {
      width: 80%;
      margin: auto;
      .shop-show-products-container {
        margin: auto;
        justify-content: center;
        gap: 1rem;
      }
      h3 {
        display: none;
      }
    }
  }

  @media ${devices.sm} {
    width: 100%;
    margin: 0;
    gap: 1rem;
    flex-direction: column;
    margin-top: 2rem;

    .shop-filter-filter-smallscreens {
      display: block;
      background-color: #00000020;
      width: 15rem;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.3rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      border: 1px solid gray;
    }
    .shop-filter-section {
      display: ${(props) => (props.showFilterlist ? "block" : "none")};

      .shop-filter-container {
        width: 90%;
      }
    }
    .shop-show-products {
      width: 80%;
      margin: auto;
      .shop-show-products-container {
        margin: auto;
        justify-content: center;
      }

      h3 {
        display: none;
      }
    }
  }
`;
