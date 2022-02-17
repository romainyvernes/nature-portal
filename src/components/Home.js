import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

export default function Home() {
  const [thumbnails, setThumbnails] = useState([]);
  
  useEffect(() => {

  }, []);
  
  return (
    <Carousel>
      {
        thumbnails.map((thumbnail) => (
          <Carousel.Item>
            <img src="" alt="" />
            <Carousel.Caption>
              <h3>

              </h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        ))
      }
    </Carousel>
  )
}
