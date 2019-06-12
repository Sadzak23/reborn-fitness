import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPen } from '@fortawesome/free-solid-svg-icons'

const SingleTimer = ({ id, name, warmupTime, intervals }) => (
  <div className="list-item">
    <div className="list-int">
      <h3>{name}</h3>
      <p>{intervals.length} intervals - Warmup time: {warmupTime}</p>
    </div>
    <div>
      <Link to={`/timer/${id}`}>
        <button className="btn-play">
          <FontAwesomeIcon icon={faPlay} style={{ color: '#fff' }} />
        </button>
      </Link>
      <button className="btn-edit-m">
        <FontAwesomeIcon icon={faPen} style={{ color: '#fff' }} />
      </button>
    </div>
  </div>
);

export default SingleTimer;