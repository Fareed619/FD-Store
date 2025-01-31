import ProductCard from "../../components/ProductCard";
import { styled } from "styled-components";
import { useGetTopProductsQuery } from "../../redux/api/admin/productsApiSlice";
import { BASE_URL } from "../../redux/constants";
import ProductCarousel from "../../components/ProductCarousel";
import { devices } from "../../../utils/styledConstants";
import Loader from "../../components/Loader";
import HomeProductsPackage from "../../components/HomeProductsPackage";
const Home = () => {
  const {
    data: topProducts,
    isLoading: productLoading,
    isError: productIsError,
    error: productError,
  } = useGetTopProductsQuery();
  if (productLoading) {
    return <Loader />;
  }
  if (productIsError) {
    return (
      <div style={{ width: "85%", margin: "auto", paddingTop: "2rem" }}>
        {productError.message}
      </div>
    );
  }
  return (
    <HomeDiv>
      <section className="sec-top-left">
        {topProducts?.products?.map((p) => (
          <ProductCard
            key={p._id}
            description={p.description}
            price={p.price}
            image={`${BASE_URL}${p.image}`}
            productInfo={p}
          />
        ))}
      </section>
      <section className="sec-top-right ">
        <ProductCarousel />
      </section>

      <section className="sec-bottom ">
        <div className="home-div-bottom">
          <h1>Special Products</h1>
          <button>Shop</button>
        </div>
        <HomeProductsPackage />
      </section>
    </HomeDiv>
  );
};

export default Home;

const HomeDiv = styled.div`
  width: 87%;
  margin-left: 7rem;
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  flex: 110;

  .sec-top-left {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
  }
  .sec-top-right {
    width: 50%;
  }
  .sec-bottom {
    width: 100%;
    margin-top: 6rem;

    h1 {
      font-size: 40px;
      font-weight: normal;
    }
    .home-div-bottom {
      display: flex;
      justify-content: space-around;
      margin-top: 4rem;
      button {
        padding: 0 3rem;
        font-size: 18px;
        border-radius: 100px;
        border: none;
        color: white;
        background-color: rgb(219 39 119);
        cursor: pointer;
      }
    }
  }

  @media ${devices.xl} {
    flex-direction: column;
    width: 80%;
    margin: auto;
    align-items: center;
    gap: 3rem;

    .sec-top-left {
      width: 100%;
      justify-content: center;
    }
    .sec-top-right {
      width: 95%;
      margin-left: 1rem;
    }
    .sec-bottom {
      .home-div-bottom {
        h1 {
          font-size: 32px;
          font-weight: bold;
        }
        button {
          padding: 0.2 2.5rem;
          font-size: 19px;
        }
      }
    }
  }
  @media ${devices.lg} {
    flex-direction: column;
    width: 80%;
    margin: auto;
    align-items: center;
    gap: 3rem;

    .sec-top-left {
      width: 100%;
      justify-content: center;
    }
    .sec-top-right {
      width: 95%;
      margin-left: 1rem;
    }
    .sec-bottom {
      .home-div-bottom {
        h1 {
          font-size: 28px;
          font-weight: bold;
        }
        button {
          padding: 0 2rem;
          font-size: 16px;
        }
      }
    }
  }
  @media ${devices.md} {
    flex-direction: column;
    width: 90%;
    margin: auto;
    gap: 4rem;

    .sec-top-left {
      width: 100%;
    }
    .sec-top-right {
      width: 90%;
      margin: auto;
    }
    .sec-bottom {
      .home-div-bottom {
        h1 {
          font-size: 20px;
          font-weight: bold;
        }
        button {
          padding: 0 1.5rem;
          font-size: 16px;
        }
      }
    }
  }
  @media ${devices.sm} {
    flex-direction: column;
    width: 90%;
    margin: auto;

    .sec-top-left {
      width: 100%;
    }
    .sec-top-right {
      width: 90%;
      margin: auto;
    }
    .sec-bottom {
      .home-div-bottom {
        h1 {
          font-size: 19px;
          font-weight: bold;
        }
        button {
          padding: 0.2rem 1.5rem;
          font-size: 16px;
        }
      }
    }
  }
`;
