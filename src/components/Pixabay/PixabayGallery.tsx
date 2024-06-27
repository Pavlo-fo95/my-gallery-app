import React, { useState, useEffect } from 'react';
import axios from 'axios';
import lightGallery from 'lightgallery';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

type Image = {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  user: string;
  userImageURL: string;
};

const PixabayGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://pixabay.com/api/', {
      params: {
        key: '43414049-9c5390ede0856b1f141544c3d', 
        q: 'nature',
        image_type: 'photo',
        per_page: 10,
      }
    })
    .then(response => {
      setImages(response.data.hits);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      lightGallery(document.getElementById('lightgallery') as HTMLElement, {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
      });
    }
  }, [images]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="pixabay-gallery" id="lightgallery">
      {images.map(image => (
        <a key={image.id} href={image.largeImageURL}>
          <img src={image.previewURL} alt={image.tags} />
        </a>
      ))}
    </div>
  );
};

export default PixabayGallery;