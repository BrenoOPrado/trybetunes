import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <ul className="songs-list">
        {
          data.map((item, index) => ((index > 0)
            ? (
              <li>
                <p>{ item.trackName }</p>
                <audio src={ item.previewUrl } data-testid="audio-component" controls>
                  <track kind="captions" />
                </audio>
              </li>
            )
            : <> </>))
        }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  })).isRequired,
};

export default MusicCard;
