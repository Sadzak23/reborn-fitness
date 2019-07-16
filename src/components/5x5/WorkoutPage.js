import React from 'react';
import { connect } from 'react-redux';
import Workout5x5 from './Workout5x5';
import WeightsForm5x5 from './WeightsForm5x5';

export const WorkoutPage = ({ user }) => (
  <div>
  {user.workouts.strongLiftsa ?
      <Workout5x5 user={user} />
      :
      <WeightsForm5x5 user={user} />}
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) => user.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(WorkoutPage);