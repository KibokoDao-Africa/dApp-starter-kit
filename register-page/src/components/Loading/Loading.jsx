import React from 'react';
import { MutatingDots } from  'react-loader-spinner'
import './Loading.css'; 

const LoadingModal = ({ loading, loadingStatement }) => {
  return (
    loading && (
      <div className="loading-modal">
        <div className='modal-container'>
        <MutatingDots 
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor= '#4fa94d'
            radius='12.5'
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
            <p>{loadingStatement}</p>
        </div>
      </div>
    )
  );
};

export default LoadingModal;
