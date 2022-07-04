import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const music = await getMusics(params.id);
    this.setState({
      musics: music,
      loading: false,
    });
  }

  render() {
    const { musics, loading } = this.state;
    const { addSong } = this.props;
    const album = (
      <div data-testid="page-album">
        <Header />
        <div className="songs">
          <div className="songs-collection">
            {(musics.length >= 1)
              ? (
                <div>
                  <img src={ musics[0].artworkUrl60 } alt={ musics[0].collectionName } />
                  <h3 data-testid="album-name">{ musics[0].collectionName }</h3>
                  <p data-testid="artist-name">{ musics[0].artistName }</p>
                </div>
              )
              : <> </>}
          </div>
          <div>
            <MusicCard
              musics={ musics.slice(1, musics.length) }
              addSong={ addSong }
            />
          </div>
        </div>
      </div>
    );
    return (!loading && musics !== [])
      ? album : <Loading />;
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  addSong: PropTypes.func.isRequired,
};

export default Album;
