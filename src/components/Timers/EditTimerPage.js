import React from 'react';
import { connect } from 'react-redux';
import TimerForm from './TimerForm';
import { editTimer } from '../../actions/timers'

export class EditTimerPage extends React.Component {
  onEdit = (id, updates) => {
    this.props.editTimer(id, updates);
    this.props.history.push('/timers');
  };
  render() {
    return (
      <div>
        <div className="content-container">
          <TimerForm
            timer={this.props.timer}
            onEditTimer={this.onEdit}
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
  editTimer: (id, timer) => dispatch(editTimer(id, timer)),
  //startAddtimer: (timer) => dispatch(startAddtimer(timer))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTimerPage);