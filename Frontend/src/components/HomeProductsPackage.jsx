import styled from "styled-components";
import { useGetProductsQuery } from "../redux/api/admin/productsApiSlice";
import CardHomeProduct from "./CardHomeProduct";
import { devices } from "../../utils/styledConstants";
const HomeProductsPackage = () => {
  const { data: products } = useGetProductsQuery({});
  return (
    <HomeProductPackageWrapper>
      {products?.products?.map((p) => (
        <CardHomeProduct key={p._id} productInfo={p} />
      ))}
    </HomeProductPackageWrapper>
  );
};

export default HomeProductsPackage;

const HomeProductPackageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
  margin-bottom: 2rem;
  gap: 3rem;
  justify-content: center;

  @media ${devices.sm} {
    flex-direction: column;
  }
  @media ${devices.md} {
    flex-direction: row;
  }
  @media ${devices.lg} {
    flex-direction: row;
  }
`;
