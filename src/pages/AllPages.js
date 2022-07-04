import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { addSong } from '../services/favoriteSongsAPI';
import Album from './Album';
import Favorites from './Favorites';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';

class AllPages extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/search" component={ Search } />
        <Route
          path="/album/:id"
          render={ (props) => (<Album
            { ...props }
            addSong={ addSong }
          />) }
        />
        <Route
          path="/favorites"
          render={ () => (<Favorites
            addSong={ addSong }
          />) }
        />
        <Route path="/profile" exact component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default AllPages;
