import React, { Component } from "react";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import "./CharactersList.scss";

export default class CharactersList extends Component {
  renderList = (arr) => {
    const { onAddToFavorite, onCharacterSelected } = this.props;
    return arr.map((item) => {
      const { id, name, gender, homeworld, favorite } = item;

      let color = "white";

      if (favorite) color = "pink";

      return (
        <li
          onClick={() => onCharacterSelected(id)}
          className="CharactersList__character"
          key={id}
        >
          <Link
            to="/character"
            className="CharactersList__character_inner"
            style={{ color }}
          >
            <span>{name}</span>
            <span>Gender: {gender}</span>
            <span>Homeworld: {homeworld}</span>
          </Link>
          <button
            onClick={(e) => {
              onAddToFavorite(id);
              e.stopPropagation();
            }}
          >
            <i className="fa fa-heart" aria-hidden="true"></i>
          </button>
        </li>
      );
    });
  };
  render() {
    const { isFavorite, term, charactersList } = this.props;
    if (!charactersList) return <Spinner />;
    const data = isFavorite
      ? charactersList.filter((el) => el.favorite)
      : charactersList;

    const items = this.renderList(data, term);
    return <ul className="CharactersList">{items}</ul>;
  }
}
