import styled from "styled-components";
import { AdminWrappr } from "../admin.style.js";
import AdminTopComponent from "../AdminTopComponent";
import { useNavigate } from "react-router-dom";
import DisplayProduct from "../../../components/DisplayProduct.jsx";
import { useGetAllProductsQuery } from "../../../redux/api/admin/productsApiSlice.js";
import Loader from "../../../components/Loader.jsx";
import { useEffect } from "react";
import { devices } from "../../../../utils/styledConstants.js";
const Products = () => {
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllProductsQuery();
  useEffect(() => {
    refetch();
  }, [refetch, products]);
  if (isError) {
    return <AdminWrappr>{error.message}</AdminWrappr>;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <AdminWrappr>
      <AdminTopComponent content="Products" addition="List" />
      <AddProduct onClick={() => navigate("/admin/createProduct")}>
        +
      </AddProduct>

      <div className="products" style={{ marginTop: "2rem" }}>
        {products?.products?.map((product) => (
          <DisplayProduct key={product._id} product={product} />
        ))}
      </div>
    </AdminWrappr>
  );
};

export default Products;

export const AddProduct = styled.div`
  font-size: 50px;
  position: fixed;
  bottom: 3rem;
  right: 6rem;
  background-color: rgb(219 39 119);
  border-radius: 50%;
  padding: 0 15px;
  cursor: pointer;

  @media ${devices.md} {
    right: 2rem;
    font-size:40px
  }
`;
