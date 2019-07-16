import React from 'react';
import { connect } from 'react-redux';
import WeightsForm5x5 from './WeightsForm5x5';

export const EditUserData5x5 = ({ user }) => (
  <div>
      <WeightsForm5x5 user={user} />
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) => user.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(EditUserData5x5);