import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      disabledButton: true,
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

  render() {
    const { inputValue, disabledButton } = this.state;
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
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
