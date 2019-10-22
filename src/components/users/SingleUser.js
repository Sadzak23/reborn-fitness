import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startRemoveUser, startEditUser, editUser, startSetUsers } from '../../actions/users';
import { onRemoveAlert } from '../Alerts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserTimes, faToggleOn, faToggleOff, faSort } from '@fortawesome/free-solid-svg-icons';
import { onReorder } from '../Alerts';
import { add0 } from '../Format';

export const SingleUser = ({ id, index, firstName, lastName, activeUser, path, startRemoveUser, startEditUser, editUser, startSetUsers, users }) => {

  const onRemoveUser = () => onRemoveAlert(startRemoveUser, id, firstName, users, index, startEditUser, startSetUsers);
  const onUserReorder = () => onReorder(users, index, firstName, startEditUser, startSetUsers);

  const handleIsActive = () => {
    activeUser ? editUser(id, { activeUser: false }) : editUser(id, { activeUser: true });
  };

  const linkTo = () => {
    if (path === "/user-select-cal") {
      return `/tool-cal/${id}`
    } else if (path === "/user-select-5x5") {
      return {
        pathname: "/dashboard5x5",
        state: {
          firstName,
          id
        }
      }
    } else if (path === "/users") {
      return `/edit-user/${id}`
    }
  };

  const multiSelect = path === "/user-select-timer";

    return (
      <div className={`${multiSelect && !activeUser ? "list-inactive-user list-item" : "list-item"}`}>
        <h3 className="list-index">{add0(index + 1)}.</h3>
        <div className="list-int list-userName">
        {/* Multi user select */}
          {multiSelect ?
            <button className="btn-activate" onClick={handleIsActive}>
              <FontAwesomeIcon icon={!activeUser ? faToggleOff : faToggleOn} className={activeUser ? "icon-active" : "icon-inactive"} />
              <h3 className={activeUser ? "" : "inactive-userName"}>{firstName} {lastName}</h3>
              </button> 
              :
            /* Single user link */
            <Link to={linkTo()} className="btn-activate" onMouseDown={(e) => { e.preventDefault() }}>
              <h3>{firstName} {lastName}</h3>
            </Link>
          }
        </div>
      {/* User buttons */}
        <div className="list-item-btns">
        {/* Edit user button */}
          <Link
            to={`/edit-user/${id}`}
            className={multiSelect && !activeUser ? "no-click" : ""}
            onMouseDown={(e) => { e.preventDefault() }}
          >
            <button disabled={multiSelect && !activeUser} className="btn-edit-m">
              <FontAwesomeIcon icon={faUserEdit} />
            </button>
          </Link>
          {/* Sort user button */}
          <button
            disabled={multiSelect && !activeUser}
            className={multiSelect && !activeUser ? "btn-edit-m no-click" : "btn-edit-m"}
            onClick={onUserReorder}
          >
            <FontAwesomeIcon icon={faSort} size="lg" />
          </button>
          {/* Delete user button */}
          <button
            disabled={multiSelect && !activeUser}
            className="btn-remove-m"
            onClick={onRemoveUser}
          >
            <FontAwesomeIcon icon={faUserTimes} />
          </button>
        </div>
      </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
  startSetUsers: () => dispatch(startSetUsers()),
  editUser: (id, updates) => dispatch(editUser(id, updates)),
  startEditUser: (id, updates) => dispatch(startEditUser(id, updates)),
  startRemoveUser: (id) => dispatch(startRemoveUser(id))
});

export default connect(undefined, mapDispatchToProps)(SingleUser);
