import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startRemoveUser, editUser } from '../../actions/users';
import { onRemoveAlert } from '../Alerts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';

export const SingleUser = ({ id, firstName, lastName, path, startRemoveUser }) => {

  // Delete user confirmation
  const onRemoveUser = () => onRemoveAlert(startRemoveUser, id, firstName);
  
  const linkTo = () => {
    if (path === "/user-select-cal") {
      return `/tool-cal/${id}`
    } else if (path === "/user-select-5x5") {
      return {
        pathname: `/dashboard5x5`,
        state: {
          firstName,
          id
        }
      }
    }
  };

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
