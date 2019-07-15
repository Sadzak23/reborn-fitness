import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { startRemoveUser, editUser } from '../../actions/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserTimes, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

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

  const handleIsActive = () => {
    activeUser ? editUser(id, { activeUser: false }) : editUser(id, { activeUser: true });
  };

  return (
    <div className={`list-item ${!activeUser ? "list-inactive-user" : ""}`}>
      <div className="list-int list-userName">
      <button className="btn-activate" onClick={handleIsActive}>
        <FontAwesomeIcon icon={!activeUser ? faToggleOff : faToggleOn} className={activeUser ? "icon-active" : "icon-inactive"} /> 
        <h3 className={activeUser ? "" : "inactive-userName"}>{firstName} {lastName}</h3>      
      </button>
      </div>
      <div className="single-user-btns">
        <Link to={`/edit-user/${id}`} className={!activeUser ? "no-click" : ""} onMouseDown={(e) => {e.preventDefault()}}>
          <button disabled={!activeUser} className="btn-edit-m">
            <FontAwesomeIcon icon={faUserEdit} />
          </button>
        </Link>
        <button disabled={!activeUser} className="btn-remove-m" onClick={onRemoveUser}>
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