import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Favorites:</h2>
      </div>
    );
  }
}

export default Favorites;
