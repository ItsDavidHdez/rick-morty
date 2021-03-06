import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import "./Characters.css";
import Search from "./Search";
import useCharacters from "../hooks/useCharacters";

const Characters = ({ darkMode }) => {
  const initialState = {
    favorites: [],
  };

  const favoriteReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_FAVORITE":
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      default:
        return state;
    }
  };

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const API = "https://rickandmortyapi.com/api/character";

  const characters = useCharacters(API);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const filteredUser = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="Container">
      <div className="Favorites">
        {favorites.favorites.map((character, index) => (
          <li key={index}>{character.name}</li>
        ))}
      </div>
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />
      <div className="Characters">
        {filteredUser.map((character, key) => (
          <div
            className={
              darkMode
                ? "Card DarkMode__Card shadow-lg p-3 mb-5  rounded"
                : "Card shadow-lg p-3 mb-5 bg-white rounded"
            }
            key={key}
          >
            <img
              className="Card__images"
              src={character.image}
              alt={character.name}
            ></img>
            <h2>{character.name}</h2>
            <h3>
              {character.status === "Alive"
                ? `😍 ${character.status}`
                : `🖤 ${character.status}`}
            </h3>
            <h4>{character.species}</h4>
            <h5>{character.gender}</h5>
            <button
              className={!darkMode ? "btn btn-dark" : "btn btn-light"}
              type="button"
              onClick={() => handleClick(character)}
            >
              Add to favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
