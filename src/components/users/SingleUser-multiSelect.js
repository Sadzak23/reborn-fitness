import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onRemoveAlert } from '../Alerts';
import { startRemoveUser, editUser } from '../../actions/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserTimes, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

export const SingleUser = ({ id, firstName, lastName, activeUser, editUser, startRemoveUser }) => {

  // Delete user confirmation
  const onRemoveUser = () => onRemoveAlert(startRemoveUser, id, firstName);

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
      <div className="list-item-btns">
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
