import React, { Component } from "react";
import "./CharacterProfile.scss";
import SwapiService from "../../services/SwapiService";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
export default class CharacterProfile extends Component {
  swapiService = new SwapiService();
  state = {
    character: null,
  };
  componentDidMount() {
    this.updatePerson();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updatePerson();
    }
  }
  updatePerson() {
    const { id } = this.props;
    if (!id) {
      return "";
    }

    this.swapiService.getCharacter(id).then((character) => {
      this.setState({ character });
    });
  }
  render() {
    if (!this.state.character) {
      return <Spinner />;
    }
    const { character } = this.state;

    const {
      id,
      name,
      gender,
      skinColor,
      eyeColor,
      height,
      mass,
      hairColor,
      birthYear,
      homeworld,
      vehicles,
      films,
    } = character;

    return (
      <div className="CharacterProfile">
        <img
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="character"
        />

        <div className="CharacterProfile__information">
          <h2>{name}</h2>
          <ul className="CharacterProfile__information__list">
            <li>
              <span>Gender: {gender}</span>
            </li>
            <li>
              <span>Skin color: {skinColor}</span>
            </li>
            <li>
              <span>Eye color: {eyeColor}</span>
            </li>
            <li>
              <span>Height: {height}</span>
            </li>
            <li>
              <span>Mass: {mass}</span>
            </li>
            <li>
              <span>Hair color: {hairColor}</span>
            </li>
            <li>
              <span>Birth year: {birthYear}</span>
            </li>
            <li>
              <span>Homeworld: {homeworld ? homeworld : "n/a"}</span>
            </li>
            <li>
              <span>Vehicles: {vehicles ? vehicles : "n/a"}</span>
            </li>
            <li>
              <span>Films: {films}</span>
            </li>
          </ul>
          <Link to="/">Back to list</Link>
        </div>
      </div>
    );
  }
}
