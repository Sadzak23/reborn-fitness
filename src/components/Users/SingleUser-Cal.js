import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { startRemoveUser, editUser } from '../../actions/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';

export const SingleUser = ({ id, firstName, lastName, activeUser, editUser, startRemoveUser }) => {

  // Delete timer confirmation
  const onRemoveUser = () => swal({
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
      <div className="list-int list-userName">
        <Link to={`/tool-cal/${id}`} className="btn-activate">
          <h3>{firstName} {lastName}</h3>
        </Link>

      </div>
      <div className="single-user-btns">
        <Link to={`/edit-user/${id}`} className={!activeUser ? "no-click" : ""}>
          <button className="btn-edit-m">
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        </Link>
        <button className="btn-remove-m" onClick={onRemoveUser}>
          <FontAwesomeIcon icon={faUserTimes} />
        </button>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  editUser: (id, updates) => dispatch(editUser(id, updates)),
  startRemoveUser: (id) => dispatch(startRemoveUser(id))
});

export default connect(undefined, mapDispatchToProps)(SingleUser);