import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      {userInfo?.isAdmin ? (
        <main>
          <Outlet />
        </main>
      ) : null}
    </div>
  );
};

export default PrivateRoutes;
