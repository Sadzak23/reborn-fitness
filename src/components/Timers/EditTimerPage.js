import React from 'react';
import { connect } from 'react-redux';
import TimerForm from './TimerForm';
import { startEditTimer } from '../../actions/timers'

export class EditTimerPage extends React.Component {
  onEdit = (id, updates) => {
    this.props.startEditTimer(id, updates);
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <div className="content-container">
          <TimerForm
            timer={this.props.timer}
            onEditTimer={this.onEdit}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    timer: state.timers.find((timer) => timer.id === props.match.params.id)
  }
}

const mapDispatchToProps = (dispatch) => ({
  startEditTimer: (id, timer) => dispatch(startEditTimer(id, timer))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTimerPage);