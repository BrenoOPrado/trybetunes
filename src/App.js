import React from 'react';
import AllPages from './pages/AllPages';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <h3>TrybeTunes</h3>
          <nav>area de navegação</nav>
        </header>
        <AllPages />
      </div>
    );
  }
}

export default App;
