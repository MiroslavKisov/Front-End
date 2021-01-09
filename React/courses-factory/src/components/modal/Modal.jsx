import React from 'react';
import Icon from '../../components/icon/Icon';
import './Modal.css';

const Modal = ({onClick, header, children}) => {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="h-full bg-gray-100 rounded shadow-lg">
          <Icon 
            iconType={"fas fa-times text-gray-500 float-right m-2 hover:text-yellow-500 cursor-pointer"}
            onClick={onClick} />
          <h1 className="text-center ml-8 text-2xl text-teal-500">{header}</h1>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;