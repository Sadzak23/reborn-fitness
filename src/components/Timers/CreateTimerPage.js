import React from 'react';
import { connect } from 'react-redux';
import TimerForm from './TimerForm';
import { createTimer } from '../../actions/timers'

export class CreateTimerPage extends React.Component {
  onCreateTimer = (timer) => {
    this.props.createTimer(timer);
    this.props.history.push('/timers');
  };
  render() {
    return (
      <div>
        <div className="content-container">
          <TimerForm
            onSubmit={this.onCreateTimer}
          />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  createTimer: (timer) => dispatch(createTimer(timer)),
  //startAddtimer: (timer) => dispatch(startAddtimer(timer))
});

export default connect(undefined, mapDispatchToProps)(CreateTimerPage);