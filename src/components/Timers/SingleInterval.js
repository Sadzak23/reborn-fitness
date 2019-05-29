import React from 'react';
import {Link} from 'react-router-dom';

const SingleInterval = ({ intervalId, intervalName, intervalMin, intervalColor, intervalSec, intervalType, }) => (
  <Link className="list-item" to={`/edit/${intervalId}`}>
    <div className="list-int">
      <h3>{intervalName}</h3>
      <p>{intervalType} - {intervalColor}</p>
    </div>
      <h3 className="list-duration">{intervalMin}:{
        intervalSec<10 ? "0"+intervalSec : intervalSec
      }</h3>
  </Link>
);

export default SingleInterval;