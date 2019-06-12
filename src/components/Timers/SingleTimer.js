import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeTimer } from '../../actions/timers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPen, faTimes } from '@fortawesome/free-solid-svg-icons'

export const SingleTimer = ({ id, name, warmupTime, intervals, removeTimer }) => {
  const onRemoveTimer = () => {
    removeTimer(id)
  };
  
  return (
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
      <button className="btn-remove-m" onClick={onRemoveTimer}>
        <FontAwesomeIcon icon={faTimes} style={{ color: '#fff' }} />
      </button>
    </div>
  </div>
)};

const mapDispatchToProps = (dispatch) => ({
  removeTimer: (id) => dispatch(removeTimer(id))
});

export default connect(undefined, mapDispatchToProps)(SingleTimer);