import React from 'react';
import { connect } from 'react-redux';
import { startCreateUser } from '../../actions/users'
import UserForm from './UserForm';
import { history } from '../../routers/AppRouter';

export const CreateUserPage = ({ startCreateUser, user, location }) => {

  const onCreateUser = (user) => {
    startCreateUser(user);
    history.goBack();
  };

    return (
      <div className="content-container">
        <UserForm
          onAddUser={onCreateUser}
          userCount={location.state.userCount}
        />
      </div>
    );
  };

const mapDispatchToProps = (dispatch) => ({
  startCreateUser: (user) => dispatch(startCreateUser(user))
});

export default connect(undefined, mapDispatchToProps)(CreateUserPage);
