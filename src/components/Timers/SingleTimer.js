import React from 'react';
import {Link} from 'react-router-dom';

const SingleTimer = ({ id, name, warmupTime, intervals }) => (
  <Link className="list-item" to={`/timer/${id}`}>
    <div className="list-int">
      <h3>{name}</h3>
      <p>Warmup time: {warmupTime}</p>
    </div>
      <h3 className="list-duration">{intervals.length} intervals</h3>
  </Link>
);

export default SingleTimer;