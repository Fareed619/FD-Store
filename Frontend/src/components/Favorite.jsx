/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import {
  getFavoritesFromLocalStorage,
  removeFavoritesFromLocalStorage,
  setFavoritesToLocalStorage,
} from "../../utils/localStorage";
import {
  removeFavorite,
  setFavorite,
  setFavoriteFromLocal,
} from "../redux/features/favoriteSlice";

const Favorite = ({ productInfo }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorites = favorites.some((p) => p._id === productInfo._id);
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    // dispatch(setFavoriteFromLocal(favoritesFromLocalStorage));
  }, [favorites, productInfo]);

  const onClickHandler = () => {
    if (!isFavorites) {
      dispatch(setFavorite(productInfo));
      setFavoritesToLocalStorage(productInfo);
    } else {
      dispatch(removeFavorite(productInfo));
      removeFavoritesFromLocalStorage(productInfo);
    }
  };

  return (
    <div onClick={onClickHandler}>
      {isFavorites ? (
        <IoMdHeart
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",

            color: "rgb(219 39 119)",
          }}
          size={23}
        />
      ) : (
        <IoIosHeartEmpty
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
            cursor: "pointer",
          }}
          size={23}
        />
      )}
    </div>
  );
};

export default Favorite;
