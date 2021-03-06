import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PlImg1 from '../images/song-album.jpg';
import PlusBig from '../images/plus-big.svg';
import { useHistory } from 'react-router';

const ChoosePlaylist = () => {
  const token =
    'BQCmexWinUQxRmpHjOKIBUYMN4nw8ib1tVbZ5QqAu-xxZZyjaRo3uyuHUKFGbaqIZ50UMlcle3Z0RziBLLTVjXK8UHBpsXz6e6MYwv2O4eEwFkaCKR1L6_3pymz9_DPmvmBt_2sKqqQNG1e8JgVnf78QZm95OoKNbOfVBGFsfRyA6KzXcbQEIIxd1ECwx0VPLm6f63EhGoRK8SiGSfo-0pNC7RGJsQftxFnhK3cgGg9SgFCBOar8IjAinPKp3iAfpP0WwX925Q';

  const [playlists, setPlaylists] = useState([]);

  const history = useHistory();

  const goToNP = () => {
    history.push(`/add-new-playlist`);
  };

  const userPlaylistsConfig = {
    method: 'get',
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const getPlaylists = () => {
    axios(userPlaylistsConfig)
      .then(function (response) {
        setPlaylists(response.data.items);
        console.log(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className='playlists'>
      <div className='one-playlist first' onClick={goToNP}>
        <img src={PlusBig} alt='' className='playlist-img' />
        <div className='playlist-text'>
          <h4 className='big-text'>Create New Playlist</h4>
        </div>
      </div>

      {playlists &&
        playlists.map((playlist, i) => (
          <div className='one-playlist' key={i}>
            <img
              src={playlist.images[0] ? playlist.images[0].url : PlImg1}
              alt={playlist.name}
              title={playlist.name}
              className='playlist-img'
            />
            <div className='playlist-text'>
              <h4 className='playlist-name'>{playlist.name}</h4>
              <span className='playlist-owner'>
                By {playlist.owner.display_name}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChoosePlaylist;
