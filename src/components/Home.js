import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const [playlists, setPlaylists] = useState([]);
  const playlistIds = [
    "1724764348981547809",
    "1724764219473079694",
    "1724870827699997402",
    "1724764164201560613"
  ];
  
  useEffect(() => {
    // retrieve the first video of each playlist upon page load
    const apiCalls = playlistIds.map((playlistId) => (
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_ACCOUNT_ID}/playlists/${playlistId}?limit=1`,
        baseURL: 'https://edge.api.brightcove.com/playback/v1/accounts/',
        headers: {
          'Accept': `application/json;pk=${process.env.REACT_APP_POLICY_KEY}`
        }
      })
    ));

    // store playlists in state
    Promise.all(apiCalls).then((responses) => {
      const playlistArr = [];
      responses.map((response) => playlistArr.push(response.data));
      setPlaylists(playlistArr);
    }).catch((err) => console.log(err));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <div className='Home'>
      <Carousel>
        {
          playlists.map((playlist) => (
            <Carousel.Item key={playlist.id}>
              <a href='https://www.brightcove.com' target='_blank' rel='noreferrer'>
                <img className='top-video-thumbnail'
                    src={playlist.videos[0].poster} 
                    alt={playlist.videos[0].description || playlist.videos[0].name} 
                />
                <Carousel.Caption>
                  <h3>
                    {playlist.name}
                  </h3>
                </Carousel.Caption>
              </a>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </div>
  )
}
