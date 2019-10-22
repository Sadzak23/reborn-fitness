import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onRemoveAlert } from '../Alerts';
import { startRemoveTimer, startSetTimers, startEditTimer } from '../../actions/timers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faSort } from '@fortawesome/free-solid-svg-icons';
import { onReorder } from '../Alerts';
import { add0 } from '../Format';

export const SingleTimer = ({ id, index, name, rounds, intervals, startRemoveTimer, startEditTimer, startSetTimers, timers }) => {
  // Delete timer confirmation
  const onRemoveTimer = () => onRemoveAlert(startRemoveTimer, id, name, timers, index, startEditTimer, startSetTimers);
  const onTimerReorder = () => onReorder(timers, index, name, startEditTimer, startSetTimers);
  const exerciseNo = intervals.reduce((count, interval) => interval.intervalType === "exercise" ? count + 1 : count, 0)
  return (
    <div className="list-item">    
      <h3 className="list-index">{add0(index + 1)}.</h3>
      <div className="list-int list-userName">
        <Link to={`/timer/${id}`} className="btn-activate grid" onMouseDown={(e) => { e.preventDefault() }}>
          <h3>{name}</h3>
          <p>{exerciseNo} exercises - {rounds} rounds</p>
        </Link>
      </div>

      <div className="list-item-btns">
        {/* Edit timer button */}
        <Link to={`/edit-timer/${id}`} onMouseDown={(e) => { e.preventDefault() }}>
          <button className="btn-edit-m">
            <FontAwesomeIcon icon={faPen} style={{ color: '#fff' }} />
          </button>
        </Link>
        {/* Sort timer button */}
        <button
            className="btn-edit-m"
            onClick={onTimerReorder}
          >
            <FontAwesomeIcon icon={faSort} size="lg" />
          </button>
          {/* Delete timer button */}
        <button className="btn-remove-m" onClick={onRemoveTimer}>
          <FontAwesomeIcon icon={faTimes} style={{ color: '#fff' }} />
        </button>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  startSetTimers: () => dispatch(startSetTimers()),
  startEditTimer: (id, updates) => dispatch(startEditTimer(id, updates)),
  startRemoveTimer: (id) => dispatch(startRemoveTimer(id))
});

export default connect(undefined, mapDispatchToProps)(SingleTimer);
