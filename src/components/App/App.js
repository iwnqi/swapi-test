import "./App.scss";
import Header from "../Header";
import SearchBox from "../SearchBox";
import React, { Component } from "react";
import CharactersList from "../CharactersList";
import CharacterProfile from "../CharacterProfile";
import SwapiService from "../../services/SwapiService";
import { BrowserRouter as Router, Route } from "react-router-dom";
const { getAllCharacters } = new SwapiService();
export default class App extends Component {
  state = {
    isFavorite: false,
    charactersList: null,
    selectedCharacterId: null,
  };
  async componentDidMount() {
    const charactersList = await getAllCharacters();
    this.setState({
      charactersList,
    });
  }
  addToFavorite = (id) => {
    this.setState(({ charactersList }) => {
      const idx = charactersList.findIndex((el) => el.id === id);
      const oldItem = charactersList[idx];
      const newItem = { ...oldItem, favorite: !oldItem.favorite };
      const newCharactersList = [
        ...charactersList.slice(0, idx),
        newItem,
        ...charactersList.slice(idx + 1),
      ];
      return {
        charactersList: newCharactersList,
      };
    });
  };
  selectCharacter = (selectedCharacterId) => {
    this.setState({
      selectedCharacterId,
    });
  };
  onFilterAll = () => {
    this.setState({
      isFavorite: false,
    });
  };
  onFilterFav = () => {
    this.setState({
      isFavorite: true,
    });
  };

  render() {
    const { isFavorite, charactersList, selectedCharacterId } = this.state;
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact>
            <SearchBox
              onFilterAll={this.onFilterAll}
              onFilterFav={this.onFilterFav}
              onSearch={this.onSearchTyping}
              charactersList={charactersList}
              onCharacterSelected={this.selectCharacter}
            />

            <CharactersList
              charactersList={charactersList}
              isFavorite={isFavorite}
              onAddToFavorite={this.addToFavorite}
              onCharacterSelected={this.selectCharacter}
            />
          </Route>
          <Route path="/character">
            <CharacterProfile id={selectedCharacterId} />
          </Route>
        </div>
      </Router>
    );
  }
}
