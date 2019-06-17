import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { removeTimer } from '../../actions/timers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

export const SingleTimer = ({ id, name, warmupTime, intervals, removeTimer }) => {

// Delete timer confirmation
  const onConfirm = () => swal({
    title: "Are you sure?!",
    text: "You can't bring it back!",
    icon: "error",
    buttons: {
      cancel: "Cancel!",
      delete: {
        text: "Yes, delete it!",
        value: "delete",
        className: "btn-alert-delete"
      },
    },
  })
    .then((value) =>
      value === "delete" ?
        swal("Deleted!", "Your timer has been deleted!", "success") &&
        removeTimer(id) : swal("Your timer is safe!", "", "success")
    );
//
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
        <Link to={`/edit-timer/${id}`}>
          <button className="btn-edit-m">
            <FontAwesomeIcon icon={faPen} style={{ color: '#fff' }} />
          </button>
        </Link>
        <button className="btn-remove-m" onClick={onConfirm}>
          <FontAwesomeIcon icon={faTimes} style={{ color: '#fff' }} />
        </button>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  removeTimer: (id) => dispatch(removeTimer(id))
});

export default connect(undefined, mapDispatchToProps)(SingleTimer);