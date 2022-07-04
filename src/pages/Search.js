import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      prevValue: '',
      disabledButton: true,
      loading: false,
      populado: false,
      returnAPI: [],
    };
  }

  inputChange = ({ target }) => {
    this.setState({
      inputValue: target.value,
    }, () => {
      if (target.value.length >= 2) {
        this.setState({
          disabledButton: false,
        });
      }
    });
  }

  onClickButton = async () => {
    const { inputValue } = this.state;
    this.setState({
      prevValue: inputValue,
      disabledButton: true,
      loading: true,
    });
    const auxiliar = await searchAlbumsAPI(inputValue);
    this.setState({
      returnAPI: auxiliar,
      inputValue: '',
      loading: false,
      populado: true,
    });
  }

  render() {
    const {
      inputValue,
      disabledButton,
      loading,
      populado,
      prevValue,
      returnAPI,
    } = this.state;
    const list = (returnAPI.length !== 0)
      ? (
        <div>
          Resultado de álbuns de:
          {' '}
          { prevValue }
          <br />
          <ul className="albuns-list">
            {
              returnAPI.map((artist) => (
                <li
                  key={ `${artist.artistId} - ${artist.collectionId}` }
                  className="album"
                >
                  <NavLink
                    to={ `/album/${artist.collectionId}` }
                    data-testid={ `link-to-album-${artist.collectionId}` }
                  >
                    <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
                    <br />
                    <p>{artist.collectionName}</p>
                    <br />
                    <p>{artist.artistName}</p>
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </div>
      )
      : <h3 className="middle">Nenhum álbum foi encontrado</h3>;
    const albuns = (populado) ? list
      : (<> </>);
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="artist-input">
            Pesquisa:
            <input
              type="text"
              data-testid="search-artist-input"
              name="artist-input"
              value={ inputValue }
              onChange={ (event) => this.inputChange(event) }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              name="artist-button"
              disabled={ disabledButton }
              onClick={ () => this.onClickButton() }
            >
              Pesquisar
            </button>
          </label>
        </form>
        <main>
          {
            (loading) ? <Loading /> : albuns
          }
        </main>
      </div>
    );
  }
}

export default Search;
