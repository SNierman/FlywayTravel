import React, { useReducer } from "react";

var initialList = [];
const changeFavoritesReducer = (state, action) => {
  var newFavorites = [];
  switch (action.type) {
    case "add":
      if (!state.some((hotel) => action.id === hotel.id)) {
        newFavorites = [
          ...state,
          {
            title: action.title,
            id: action.id,
            index: action.index,
            thumbnail: action.thumbnail,
            isFavorited: true,
            streetAddress: action.streetAddress,
            starRating: action.starRating,
            price: action.price,
          },
        ];
        return newFavorites;
      }
      return state;

    default:
      throw new Error(`Reducer does not recognize ${action.type}`);
  }
};

export const FavoritesContext = React.createContext();

export const HotelFavoritesProvider = (props) => {
  const [favoritesState, dispatchChangeFavorites] = useReducer(
    changeFavoritesReducer,
    initialList
  );

  return (
    <FavoritesContext.Provider
      value={{
        listState: favoritesState,
        listDispatch: dispatchChangeFavorites,
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
};
