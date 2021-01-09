import React from 'react';

const NavImage = (props) => {
  return (
    <li>
      <img className="rounded" src={props.src} alt={"Default Profile Pic"} height="64" width="64" />
    </li>
  );
};

export default NavImage;