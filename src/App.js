import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <h3>TrybeTunes</h3>
          <nav>area de navegação</nav>
        </header>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;