import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';


const LoadingPage = () => (
  <div className="loader">
  <FontAwesomeIcon icon={faSyncAlt} className="loader__img" spin />
  </div>
);

export default LoadingPage;