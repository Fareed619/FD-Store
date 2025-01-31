/* eslint-disable no-undef */
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userAuthSlice";
import { useLogoutApiMutation } from "../../redux/api/authApiSlice";
import { toast } from "react-toastify";
import {
  IoHome,
  FaBasketShopping,
  FaCartShopping,
  MdOutlineFavorite,
  IoIosArrowDropdownCircle,
  RiLogoutCircleLine,
  GrList,
  IoIosArrowDropleft,
} from "../icons/sidebar.icon";
import {
  SidebarWrapper,
  Span,
  CustomSpanIcon,
  DropdownDiv,
} from "./sidebar.style";
const Sidebar = () => {
  const [opendropdown, setopendropdown] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites).length;
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartLength = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

  const [logoutApi] = useLogoutApiMutation();
  const logoutHandler = async () => {
    try {
      const info = logoutApi().unwrap();
      console.log(info);
      if (info.error) {
        throw new Error(info.error.message);
      }
      dispatch(logout());
      toast.success("logged out successfuly");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <SidebarWrapper
        navbar={navbar}
        onMouseLeave={() => setopendropdown(false)}
      >
        <div className="sidebar-top">
          <div className="sidebar-container-link">
            <Link
              to="/"
              className="sidebar-route"
              onClick={() => setNavbar(false)}
            >
              <IoHome /> <Span>Home</Span>
            </Link>
          </div>

          <div className="sidebar-container-link">
            {" "}
            <Link
              to="/shop"
              className="sidebar-route"
              onClick={() => setNavbar(false)}
            >
              <FaBasketShopping /> <Span>Shop</Span>
            </Link>
          </div>
          <div
            className="sidebar-container-link"
            style={{ position: "relative" }}
          >
            {" "}
            <Link
              to="/cart"
              className="sidebar-route"
              onClick={() => setNavbar(false)}
            >
              <FaCartShopping />{" "}
              {cartLength > 0 && (
                <CustomSpanIcon>{Number(cartLength)}</CustomSpanIcon>
              )}
              <Span>Cart</Span>
            </Link>
          </div>
          <div
            className="sidebar-container-link"
            style={{ position: "relative" }}
          >
            {" "}
            <Link
              to="/favorites"
              className="sidebar-route"
              onClick={() => setNavbar(false)}
            >
              <MdOutlineFavorite />
              {favorites > 0 && (
                <CustomSpanIcon>{Number(favorites)}</CustomSpanIcon>
              )}
              <Span>Favorites</Span>
            </Link>
          </div>
        </div>
        <div className="sidebar-bottom">
          <div style={{ width: "100%" }}>
            <div className="sidebar-bottom-dropdown" style={{ color: "white" }}>
              <IoIosArrowDropdownCircle
                style={{ cursor: "pointer" }}
                onClick={() => setopendropdown(!opendropdown)}
              />{" "}
              <Span style={{ width: "30%" }}>{userInfo?.username}</Span>
            </div>
            <DropdownDiv opendropdown={opendropdown}>
              {userInfo?.isAdmin ? (
                <>
                  {" "}
                  <Link to="/admin/dashboard" className="sidebar-bottom-link">
                    Dashboard
                  </Link>
                  <Link to="/admin/users" className="sidebar-bottom-link">
                    users
                  </Link>
                  <Link to="/admin/orderslist" className="sidebar-bottom-link">
                    Orders
                  </Link>
                  <Link to="/admin/products" className="sidebar-bottom-link">
                    products
                  </Link>
                  <Link to="/admin/categories" className="sidebar-bottom-link">
                    categories
                  </Link>
                  <Link to="/profile" className="sidebar-bottom-link">
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link to="/profile" className="sidebar-bottom-link">
                    Profile
                  </Link>
                </>
              )}
            </DropdownDiv>
            <div
              className="sidebar-bottom-dropdown"
              style={{
                color: "white",
                marginTop: "10px",
                display: `${userInfo}?"none":"flex"`,
              }}
            >
              <RiLogoutCircleLine style={{ cursor: "pointer" }} />{" "}
              <Span
                style={{ width: "30%", cursor: "pointer" }}
                onClick={logoutHandler}
              >
                logout
              </Span>
            </div>
          </div>
        </div>
        <div className="sidebar-exit" onClick={() => setNavbar(false)}>
          <IoIosArrowDropleft size={23} />
        </div>
      </SidebarWrapper>
      {!navbar && (
        <GrList
          className="sidebar-list-smallscreens"
          onClick={() => setNavbar(!navbar)}
          style={{ display: `block` }}
        />
      )}
    </>
  );
};

export default Sidebar;
