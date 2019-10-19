import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onRemoveAlert } from '../Alerts';
import { startRemoveTimer } from '../../actions/timers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

export const SingleTimer = ({ id, name, rounds, intervals, startRemoveTimer }) => {
  // Delete timer confirmation
  const onRemoveTimer = () => onRemoveAlert(startRemoveTimer, id, name);
  const exerciseNo = intervals.reduce((count, interval) => interval.intervalType === "exercise" ? count + 1 : count, 0)
  return (
    <div className="list-item">
      <div className="list-int list-userName">
        <Link to={`/timer/${id}`} className="btn-activate grid" onMouseDown={(e) => { e.preventDefault() }}>
          <h3>{name}</h3>
          <p>{exerciseNo} exercises - {rounds} rounds</p>
        </Link>
      </div>

      <div className="list-item-btns">
        <Link to={`/edit-timer/${id}`} onMouseDown={(e) => { e.preventDefault() }}>
          <button className="btn-edit-m">
            <FontAwesomeIcon icon={faPen} style={{ color: '#fff' }} />
          </button>
        </Link>
        <button className="btn-remove-m" onClick={onRemoveTimer}>
          <FontAwesomeIcon icon={faTimes} style={{ color: '#fff' }} />
        </button>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  startRemoveTimer: (id) => dispatch(startRemoveTimer(id))
});

export default connect(undefined, mapDispatchToProps)(SingleTimer);
