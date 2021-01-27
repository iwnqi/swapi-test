export default class SwapiService {
  _apiBase = "https://swapi.dev/api/";
  _apiImgBase = "https://starwars-visualguide.com/assets/img/characters/";
  _idRegExp = /\/([0-9]*)\/$/;
  _getId(сharacter) {
    return сharacter.url.match(this._idRegExp)[1];
  }
  _getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${this._apiBase}${url}, ${res.status}`);
    }
    return await res.json();
  };
  _setHomeworld = async (homeworldApi) => {
    const homeworld = await this._getResource(homeworldApi);
    return homeworld.name;
  };
  _setObjectWithFields = async (arrayOfApis) => {
    const arrayWithCharactersFields = await Promise.all(
      arrayOfApis.map((item) => {
        return this._getResource(item);
      })
    );
    return arrayWithCharactersFields;
  };

  _setVehicles = (allVehicles) => {
    const vehiclesList = allVehicles.map((item) => {
      return `${item.name} (${item.model})`;
    });
    return vehiclesList.join(", ");
  };
  _setFilms = (allFilms) => {
    const filmsList = allFilms.map((item) => {
      return `"${item.title}"`;
    });
    return filmsList.join(", ");
  };
  _setCharacter = async (character) => {
    const homeworld = await this._setHomeworld(character.homeworld);

    const allVehicles = await this._setObjectWithFields(character.vehicles);
    const vehicles = this._setVehicles(allVehicles);

    const allFilms = await this._setObjectWithFields(character.films);
    const films = this._setFilms(allFilms);
    return {
      id: this._getId(character),
      name: character.name,
      height: character.height,
      mass: character.mass,
      gender: character.gender,
      hairColor: character.hair_color,
      skinColor: character.skin_color,
      eyeColor: character.eye_color,
      birthYear: character.birth_year,
      homeworld,
      vehicles,
      films,
    };
  };

  _setAllCharacters = async (character) => {
    const homeworld = await this._setHomeworld(character.homeworld);
    return {
      id: this._getId(character),
      name: character.name,
      gender: character.gender,
      homeworld,
    };
  };
  getAllCharacters = async () => {
    const res = await this._getResource(`${this._apiBase}people/`);
    return await Promise.all(res.results.map(this._setAllCharacters));
  };

  getCharacter = async (id) => {
    const character = await this._getResource(`${this._apiBase}people/${id}/`);
    return this._setCharacter(character);
  };

  getCharacterImage = (character) => {
    return `${this._apiImgBase}${character.id}.jpg`;
  };
}
