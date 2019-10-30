import React from 'react';
import { connect } from 'react-redux';
import { startRemoveUser, startEditUser, startSetUsers } from '../../actions/users';
import { onRemoveAlert } from '../Alerts';
import { faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { onReorder } from '../Alerts';
import { ListItemIndex, ListItemTitle, ListItemBtns } from '../Elements/List';

export const SingleUser = ({ id, index, firstName, lastName, startRemoveUser, startEditUser, startSetUsers, users }) => {
  const onRemoveUser = () => onRemoveAlert(startRemoveUser, id, firstName, users, index, startEditUser, startSetUsers);
  const onUserReorder = () => onReorder(users, index, firstName, startEditUser, startSetUsers);

  return (
    <div className="list-item">
      <ListItemIndex index={index} />
      <ListItemTitle linkPath={`/edit-user/${id}`} title={`${firstName} ${lastName}`} />
      <ListItemBtns
        editLink={`/edit-user/${id}`}
        onSort={onUserReorder}
        onRemove={onRemoveUser}
        editIcon={faUserEdit}
        removeIcon={faUserTimes}
      />      
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  startSetUsers: () => dispatch(startSetUsers()),
  startEditUser: (id, updates) => dispatch(startEditUser(id, updates)),
  startRemoveUser: (id) => dispatch(startRemoveUser(id))
});

export default connect(undefined, mapDispatchToProps)(SingleUser);
