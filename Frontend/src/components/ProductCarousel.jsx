import Slider from "react-slick";
import { useGetTopProductsQuery } from "../redux/api/admin/productsApiSlice";
import { styled } from "styled-components";
// React-icons
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { FaChessBishop } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";
import { MdRemoveShoppingCart } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { devices } from "../../utils/styledConstants";

const ProductCarousel = () => {
  const { data: topProducts } = useGetTopProductsQuery();
  const navigate = useNavigate();
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplayspeed: 5000,
    cssEase: "linear",
  };
  return (
    <ProductCarouselWrapper>
      <Slider {...settings} className="product-carousel-slider">
        {topProducts?.products?.map((p) => (
          <div key={p._id}>
            <img
              src={`${p.image}`}
              alt=""
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/product/${p._id}`)}
            />
            <CarouselBottom>
              <div className="carousel-part1">
                <h3>{p.name}</h3>
                <p>$ {p.price}</p>
                <p>{p.description.slice(0, 50)}...</p>
              </div>
              <div className="carousel-part2">
                <p>
                  <FaChessBishop />
                  {"  "}
                  Brand: {p.brand}
                </p>
                <p>
                  <MdOutlineAccessTimeFilled /> {"  "}Added:{" "}
                  {moment(p.createdAt).fromNow()}{" "}
                </p>
                <p>
                  <FaStar /> {"    "}
                  Reviews : {p.numReviews}{" "}
                </p>
              </div>
              <div className="carousel-part3">
                <p>
                  {" "}
                  <GiStarsStack /> {"  "}Ratings: {p.rating}
                </p>
                <p>
                  <MdRemoveShoppingCart /> Quantity: {p.quantity}
                </p>
                <p>
                  <FaShop />
                  {"  "}
                  In Stock: {p.countInStock}
                </p>
              </div>
            </CarouselBottom>
          </div>
        ))}
      </Slider>
    </ProductCarouselWrapper>
  );
};

export default ProductCarousel;

const ProductCarouselWrapper = styled.div`
  /* .product-carousel-slider {
    width: 80%;
  } */
`;
const CarouselBottom = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.6rem;
  .carousel-part1 {
    flex: 1.2 1 0;
  }
  .carousel-part2 {
    flex: 1 1 0;
  }
  .carousel-part3 {
    flex: 0.5 1 0;
  }
  div p {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }
  @media ${devices.lg} {
    div {
      min-width: 40%;
    }
  }
  @media ${devices.md} {
    display: none;
  }
`;
