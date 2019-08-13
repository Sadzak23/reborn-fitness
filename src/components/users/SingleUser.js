import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { startRemoveUser, editUser } from '../../actions/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';

export const SingleUser = ({ id, firstName, lastName, path, startRemoveUser }) => {

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
  
    const linkTo = () => {
      if (path === "/user-select-cal") {
        return `/tool-cal/${id}`
      } else if (path === "/user-select-5x5") {
        return `/workout5x5/${id}`
      }
    }

  return (
    <div className="list-item">
      <div className="list-int list-userName">
        <Link to={linkTo()} className="btn-activate" onMouseDown={(e) => {e.preventDefault()}}>
          <h3>{firstName} {lastName}</h3>
        </Link>
      </div>
      
      <div className="list-item-btns">
        <Link to={`/edit-user/${id}`} onMouseDown={(e) => {e.preventDefault()}}>
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
