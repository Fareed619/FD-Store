/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaList } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { devices } from "../../../utils/styledConstants";
const AdminTopComponent = ({ content, addition }) => {
  const [openAdminlist, setOpenAdminlist] = useState(false);

  const toggleAdminlist = () => {
    setOpenAdminlist(!openAdminlist);
  };
  return (
    <TopDiv>
      <h2>
        {content}
        <TopSpan>{addition}</TopSpan>
      </h2>
      <FaList size={25} onClick={toggleAdminlist} className="top-div-Fa-List" />
      <AdminList openAdminlist={openAdminlist}>
        <li>
          <Link to="/admin/dashboard" style={{ color: "white" }}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/users" style={{ color: "white" }}>
            Users
          </Link>
        </li>
        <li>
          <Link to="/admin/products" style={{ color: "white" }}>
            Products
          </Link>
        </li>
        <li>
          <Link to="/admin/createProduct" style={{ color: "white" }}>
            Create Product
          </Link>
        </li>

        <li>
          <Link to="/admin/orderslist" style={{ color: "white" }}>
            orders
          </Link>
        </li>
        <li>
          <Link to="/admin/categories" style={{ color: "white" }}>
            Cateories
          </Link>
        </li>
      </AdminList>
    </TopDiv>
  );
};

export default AdminTopComponent;

export const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  max-width: 98%;
  margin: auto;
  h2 {
    padding-top: 0.3rem;
  }
  .top-div-Fa-List {
    position: fixed;
    right: 5%;
    cursor: pointer;
  }
  @media ${devices.sm} {
    margin-top: 0.5rem;
    h2 {
      font-size: 22px;
    }
  }

  @media ${devices.lg} {
    width: 93%;
  }
`;
export const TopSpan = styled.span`
  text-transform: uppercase;
  font-size: 25px;
  color: rgb(219 39 119);
  margin-left: 0.5rem;

  @media ${devices.sm} {
    font-size: 22px;
  }
`;
export const AdminList = styled.div`
  display: ${(props) => (props.openAdminlist ? "block" : "none")};
  background: #000000b7;
  position: fixed;

  top: 70px;

  /* right: 100px; */
  right: 7%;
  list-style: none;
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  li {
    font-size: 18px;
    padding: 0.5rem 1.2rem;
    margin-top: 0.4rem;
    border-radius: 4px;
    transition: 0.4s ease;

    cursor: pointer;
    &:hover {
      background-color: #808080cb;
    }
  }
`;
