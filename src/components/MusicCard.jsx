import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorites: [],
    };
  }

  newSong = async ({ target }, name, url, id) => {
    const { addSong } = this.props;
    this.setState({
      loading: true,
    });
    if (target.checked) {
      await addSong(
        {
          trackName: name,
          previewUrl: url,
          trackId: id,
        },
      );
    } else {
      await removeSong({ trackId: id });
    }
    const listFavorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      favorites: listFavorites,
    });
  }

  render() {
    const { musics } = this.props;
    const { loading, favorites } = this.state;
    const list = (
      <ul>
        {
          musics.map((item, index) => ((
            <li key={ index } className="song">
              <p>{ item.trackName }</p>
              <div>
                <audio src={ item.previewUrl } data-testid="audio-component" controls>
                  <track kind="captions" />
                </audio>
                <label htmlFor="favorite">
                  Favorita
                  <input
                    type="checkbox"
                    name="favorite"
                    data-testid={ `checkbox-music-${item.trackId}` }
                    onChange={ (event) => this.newSong(
                      event, item.trackName, item.previewUrl, item.trackId,
                    ) }
                    checked={ favorites.some(
                      (element) => element.trackId === item.trackId,
                    ) }
                  />
                </label>
              </div>
            </li>
          )
          ))
        }
      </ul>
    );
    return (loading) ? <Loading /> : list;
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  })).isRequired,
  addSong: PropTypes.func.isRequired,
};

export default MusicCard;
