export const getFavoritesFromLocalStorage = () => {
  // array contains all the favorites products
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const setFavoritesToLocalStorage = (productInfo) => {
  const favorites = getFavoritesFromLocalStorage();
  const isExists = favorites.some((p) => p._id === productInfo._id);
  if (!isExists) {
    favorites.push(productInfo);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavoritesFromLocalStorage = (productInfo) => {
  const favorites = getFavoritesFromLocalStorage();
  const newFavorites = favorites.filter((p) => p._id !== productInfo._id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
};
