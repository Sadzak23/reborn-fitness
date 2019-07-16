import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routers/AppRouter';
import { startSetEditData5x5 } from '../../actions/users';

export class Workout5x5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squat: '',
      benchPress: '',
      barbellRow: '',
      overheadPress: '',
      deadLift: '',
    }
  };

  onSquatChange = (e) => {
    const squat = e.target.value;
    if (!squat || squat.match(/^\d{1,3}$/)) {
      this.setState({ squat });
    }
  };

  onBenchPressChange = (e) => {
    const benchPress = e.target.value;
    if (!benchPress || benchPress.match(/^\d{1,3}$/)) {
      this.setState({ benchPress });
    }
  };

  onBarbellRowChange = (e) => {
    const barbellRow = e.target.value;
    if (!barbellRow || barbellRow.match(/^\d{1,3}$/)) {
      this.setState({ barbellRow });
    }
  };
  onOverheadPressChange = (e) => {
    const overheadPress = e.target.value;
    if (!overheadPress || overheadPress.match(/^\d{1,3}$/)) {
      this.setState({ overheadPress });
    }
  };

  onDeadliftChange = (e) => {
    const deadLift = e.target.value;
    if (!deadLift || deadLift.match(/^\d{1,3}$/)) {
      this.setState({ deadLift });
    }
  };

  onSave = () => {
    const data = {
      trainingType: "a",
      squat: this.state.squat ? Math.round(this.state.squat * 0.75 / 5) * 5 : 20,
      benchPress: this.state.benchPress ? Math.round(this.state.benchPress * 0.15) * 5 : 20,
      barbellRow: this.state.barbellRow ? Math.round(this.state.barbellRow * 0.15) * 5 : 30,
      overheadPress: this.state.overheadPress ? Math.round(this.state.overheadPress * 0.15) * 5 : 20,
      deadLift: this.state.deadLift ? Math.round(this.state.deadLift * 0.15) * 5 : 40
    };
    const userId = this.props.user.id
    this.props.startSetEditData5x5(userId, data)
  };

  onCancel = () => {
    history.goBack()
  };

  render() {
    return (
      <div className="content-container form">
        <h1 className="text-center margin-top">Hello {this.props.user.firstName}</h1>
        <h2 className="text-center">What is max weight you can lift 5 times?</h2>
        <p className="text-center">If you never tried an exercise, leave weight field blank</p>
        <div className="flex-center">
          <label className="text-input fit-content margin-right">
            Squat: 5x <input
              type="text"
              onChange={this.onSquatChange}
              className="inline-input"
              placeholder="0"
              value={this.state.squat}
            /> kg
          </label>
          <label className="text-input fit-content margin-right">
            Bench Press: 5x <input
              type="text"
              onChange={this.onBenchPressChange}
              className="inline-input"
              placeholder="0"
              value={this.state.benchPress}
            /> kg
          </label>
          <label className="text-input fit-content margin-right">
            Barbell Row: 5x <input
              type="text"
              onChange={this.onBarbellRowChange}
              className="inline-input"
              placeholder="0"
              value={this.state.barbellRow}
            /> kg
          </label>
        </div>
        <div className="flex-center">
          <label className="text-input fit-content margin-right">
            Overhead Press: 5x <input
              type="text"
              onChange={this.onOverheadPressChange}
              className="inline-input"
              placeholder="0"
              value={this.state.overheadPress}
            /> kg
          </label>
          <label className="text-input fit-content margin-right">
            Deadlift: 5x <input
              type="text"
              onChange={this.onDeadliftChange}
              className="inline-input"
              placeholder="0"
              value={this.state.deadLift}
            /> kg
          </label>
        </div>

          <div className="flex-center">
            <h3 className="margin-right">
              Squat: {this.state.squat ?
                Math.round(this.state.squat * 0.75 / 2.5) * 2.5 // Getting 75% of max value that is divisible by 2.5
                : 20}kg</h3>
            <h3 className="margin-right">Bench Press: {this.state.benchPress ?
              Math.round(this.state.benchPress * 0.3) * 2.5
              : 30}kg</h3>
            <h3 className="margin-right">Barbell Row: {this.state.barbellRow ?
              Math.round(this.state.barbellRow * 0.3) * 2.5
              : 20}kg</h3>
          </div>
          <div className="flex-center">
            <h3 className="margin-right">Overhead Press: {this.state.overheadPress ?
              Math.round(this.state.overheadPress * 0.3) * 2.5
              : 20}kg</h3>
            <h3 className="margin-right">Deadlift: {this.state.deadLift ?
              Math.round(this.state.deadLift * 0.3) * 2.5
              : 40}kg</h3>
          </div>
          
        <div className="flex">
          <button className="btn-save" onClick={this.onSave}>
            <FontAwesomeIcon icon={faSave} /> Save initial data
          </button>
          <button className="btn-cancel form-cancel" onClick={this.onCancel}>
            <FontAwesomeIcon icon={faBan} /> Cancel
          </button>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  startSetEditData5x5: (userId, data) => dispatch(startSetEditData5x5(userId, data)),
  startEditData5x5: (userId, data) => dispatch(startEditData5x5(userId, data))
});

export default connect(undefined, mapDispatchToProps)(Workout5x5);
