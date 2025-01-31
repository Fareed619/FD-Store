import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const paths = ["/login", "/register"];

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <div>
      <ToastContainer />
      <div style={{ display: "flex" }}>
        {paths.includes(location.pathname) ? null : <Sidebar />}
        <main style={{ width: "100%" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
