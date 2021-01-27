import "./SearchBox.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const SearchBox = ({
  onFilterAll,
  onFilterFav,
  onCharacterSelected,
  charactersList,
}) => {
  const [term, setTerm] = useState("");
  const [className, setClassName] = useState("SearchBox__list--hidden");

  const onSearchTyping = (e) => {
    const value = e.target.value.toLowerCase();
    setTerm(value);
    setClassName("SearchBox__list--visible");
  };
  const onSearch = (arr, term) => {
    if (!term) return arr;
    return arr.filter((el) => el.name.toLowerCase().includes(term));
  };
  const renderSearchList = (arr) => {
    if (!charactersList) return "wait";

    return arr.map(({ name, id }) => {
      return (
        <Link to="/character" key={id}>
          <li
            className="SearchBox__character"
            onClick={() => onCharacterSelected(id)}
          >
            <span>{name}</span>
          </li>
        </Link>
      );
    });
  };
  const onBlur = (e) => {
    if (e.target.tagName === "input") return;
    else setTimeout(() => setClassName("SearchBox__list--hidden"), 300);
  };
  return (
    <div className="App__SearchBox">
      <input
        type="text"
        onChange={onSearchTyping}
        onBlur={onBlur}
        placeholder="search through characters"
      />
      <div className="SearchBox__Buttons">
        <button
          className="active"
          data-event="all"
          onClick={onFilterAll}
          id="allFilter"
        >
          All
        </button>
        <button data-event="active" onClick={onFilterFav} id="activeFilter">
          Favorite
        </button>
      </div>
      <div>
        <ul className={className}>
          {renderSearchList(onSearch(charactersList, term))}
        </ul>
      </div>
    </div>
  );
};
export default SearchBox;
