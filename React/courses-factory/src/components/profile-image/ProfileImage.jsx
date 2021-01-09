import React from 'react';

const ProfileImage = (props) => {
  return (
    <div>
      <img 
        src={props.src} 
        alt={"BackgroundPic"} 
        height="84" 
        width="84" 
        className={props.className}/>
    </div>
  );
};

export default ProfileImage;