import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import { startEditUser } from '../../actions/users'

export class EditUserPage extends React.Component {
  onEdit = (id, updates) => {
    this.props.startEditUser(id, updates);
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="content-container">
        <UserForm
          user={this.props.user}
          onEditUser={this.onEdit}
        />
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) => user.id === props.match.params.id)
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditUser: (id, updates) => dispatch(startEditUser(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage);
