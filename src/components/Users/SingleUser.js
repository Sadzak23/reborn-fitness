import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { startRemoveUser } from '../../actions/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';

export const SingleUser = ({ id, firstName, lastName, birthdate, gender, height, weight, startRemoveUser }) => {

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
        swal("Deleted!", `${firstName} has been deleted!`, "success") &&
        startRemoveUser(id) : swal(`${firstName} is safe!`, "", "success")
    );
  return (
    <div className="list-item">
      <div className="list-int">
        <h3>{firstName} {lastName}</h3>
      </div>
      <div>
        <Link to={`/edit-user/${id}`}>
          <button className="btn-edit-m">
            <FontAwesomeIcon icon={faUserEdit} style={{ color: '#fff' }} />
          </button>
        </Link>
        <button className="btn-remove-m" onClick={onConfirm}>
          <FontAwesomeIcon icon={faUserTimes} style={{ color: '#fff' }} />
        </button>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  startRemoveUser: (id) => dispatch(startRemoveUser(id))
});

export default connect(undefined, mapDispatchToProps)(SingleUser);