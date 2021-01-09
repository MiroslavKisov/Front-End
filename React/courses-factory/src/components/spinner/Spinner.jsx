import React from 'react';
import './Spinner.css';

const Spinner = (props) => {
  return (
    <div className="spinner-container">
      <h1 className="mt-32 text-4xl text-teal-500">{props.action}</h1>
      <div className="vertical-center">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;