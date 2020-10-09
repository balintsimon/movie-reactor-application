import React from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
  const imageName = "load_icon_4";

  return (
      <div className="loading-animation-container">
        <img className="loading-image"
             src={`/images/${imageName}.png`} alt="Loading screen"/>
      </div>
  );
};

export default LoadingAnimation;
