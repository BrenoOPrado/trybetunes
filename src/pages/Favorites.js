import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      songs: [],
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      songs: favoriteSongs,
      loading: false,
    });
  }

  refresh = async () => {
    this.setState({
      loading: true,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      songs: favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { loading, songs } = this.state;
    const list = (<MusicCard
      musics={ songs }
      prevFavorites={ songs }
      func={ this.refresh }
    />);
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>Favorites:</h2>
        {
          (loading) ? <Loading /> : list
        }
      </div>
    );
  }
}

export default Favorites;
