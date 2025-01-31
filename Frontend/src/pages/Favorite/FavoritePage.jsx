import { useSelector } from "react-redux";
import { styled } from "styled-components";
import CardHomeProduct from "../../components/CardHomeProduct";
import { devices } from "../../../utils/styledConstants";
const FavoritePage = () => {
  const favorites = useSelector((state) => state.favorites);
  return (
    <FavritesStyledWrapper>
      <h2>All Favorites products ({favorites.length})</h2>
      <div>
        {favorites.map((p) => (
          <CardHomeProduct key={p._id} productInfo={p} />
        ))}
      </div>
    </FavritesStyledWrapper>
  );
};

export default FavoritePage;

const FavritesStyledWrapper = styled.div`
  width: 85%;
  margin: auto;
  padding-top: 2rem;
  h2 {
    margin-bottom: 2rem;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    /* gap: 1rem; */
    column-gap:1.6rem;
  }

  @media ${devices.lg} {
    h2 {
      font-size: 24px;
      width: 90%;
      margin: 1rem auto;
    }
  }
  @media ${devices.md} {
    h2 {
      font-size: 22px;
      width: 90%;
      margin: 1rem auto;
    }
  }
  @media ${devices.sm} {

    h2 {
      font-size: 19px;
      width: fit-content;
      margin: 1.5rem auto;
    }
  }
`;
