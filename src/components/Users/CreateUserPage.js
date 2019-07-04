import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/users'
import { UserForm } from './UserForm';

export class CreateUserPage extends React.Component {

  onCreateUser = (user) => {
    this.props.createUser(user);
  };

  render() {
    return (
      <div>
      <div className="content-container">
        <UserForm
          onAddUser={this.onCreateUser}
        />
      </div>
    </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => ({
  createUser: (user) => dispatch(createUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPage);