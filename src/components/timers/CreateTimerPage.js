import React from 'react';
import { connect } from 'react-redux';
import TimerForm from './TimerForm';
import { startCreateTimer } from '../../actions/timers'

export class CreateTimerPage extends React.Component {
  onCreateTimer = (timer) => {
    this.props.startCreateTimer(timer);
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <div className="content-container">
          <TimerForm
            onAddTimer={this.onCreateTimer}
          />
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  startCreateTimer: (timer) => dispatch(startCreateTimer(timer))
});

export default connect(undefined, mapDispatchToProps)(CreateTimerPage);
