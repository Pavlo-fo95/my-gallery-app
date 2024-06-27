import React from 'react';
import PixabayGallery from '../Pixabay/PixabayGallery';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Pixabay Image Gallery</h1>
      <PixabayGallery />
    </div>
  );
};

export default App;
