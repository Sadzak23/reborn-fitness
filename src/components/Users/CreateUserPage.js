import React from 'react';
import { connect } from 'react-redux';
import { startCreateUser } from '../../actions/users'
import UserForm from './UserForm';

export class CreateUserPage extends React.Component {

  onCreateUser = (user) => {
    this.props.startCreateUser(user);
    this.props.history.push('/users');
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
  startCreateUser: (user) => dispatch(startCreateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserPage);