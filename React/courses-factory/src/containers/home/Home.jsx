import React from 'react';
import BgImage from '../../components/background-image/BgImage';
import background from '../../static/pictures/profile-background.png';

const Home = () => {
  return (
    <div>
      <BgImage src={background} className={"max-h-full"}/>
    </div>
  );
};

export default Home;