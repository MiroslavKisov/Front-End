import React from 'react';

const BgImage = (props) => {
  return (
    <div>
      <img 
      src={props.src} alt={"BackgroundPic"} 
      className={props.className} />
    </div>
  );
};

export default BgImage;