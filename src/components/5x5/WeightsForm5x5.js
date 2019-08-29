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
      squat: this.userData ? this.userData.squat : '',
      benchPress: this.userData ? this.userData.benchPress : '',
      barbellRow: this.userData ? this.userData.barbellRow : '',
      overheadPress: this.userData ? this.userData.overheadPress : '',
      deadlift: this.userData ? this.userData.deadlift : '',
    }
  };

  onSquatChange = (e) => {
    const squat = e.target.value;
    if (!squat || squat.match(/^\d{1,3}([.]\d{0,1})?$/)) {
      this.setState({ squat });
    }
  };

  onBenchPressChange = (e) => {
    const benchPress = e.target.value;
    if (!benchPress || benchPress.match(/^\d{1,3}([.]\d{0,1})?$/)) {
      this.setState({ benchPress });
    }
  };

  onBarbellRowChange = (e) => {
    const barbellRow = e.target.value;
    if (!barbellRow || barbellRow.match(/^\d{1,3}([.]\d{0,1})?$/)) {
      this.setState({ barbellRow });
    }
  };
  onOverheadPressChange = (e) => {
    const overheadPress = e.target.value;
    if (!overheadPress || overheadPress.match(/^\d{1,3}([.]\d{0,1})?$/)) {
      this.setState({ overheadPress });
    }
  };

  onDeadliftChange = (e) => {
    const deadlift = e.target.value;
    if (!deadlift || deadlift.match(/^\d{1,3}([.]\d{0,1})?$/)) {
      this.setState({ deadlift });
    }
  };

  onSave = () => {
    const data = {
      trainingType: "a",
      squat: this.state.squat ? Math.round(parseFloat(this.state.squat * 0.75 / 2.5)) * 2.5 : 20,
      benchPress: this.state.benchPress ? Math.round(parseFloat(this.state.benchPress * 0.3)) * 2.5 : 20,
      barbellRow: this.state.barbellRow ? Math.round(parseFloat(this.state.barbellRow * 0.3)) * 2.5 : 30,
      overheadPress: this.state.overheadPress ? Math.round(parseFloat(this.state.overheadPress * 0.3)) * 2.5 : 20,
      deadlift: this.state.deadlift ? Math.round(parseFloat(this.state.deadlift * 0.3)) * 2.5 : 40
    };
    const userId = this.props.user.id
    this.props.startSetEditData5x5(userId, data)
  };

  onEdit = () => {
    const data = {
      squat: Math.floor(this.state.squat / 2.5) * 2.5,
      benchPress: Math.floor(this.state.benchPress / 2.5) * 2.5,
      barbellRow: Math.floor(this.state.barbellRow / 2.5) * 2.5,
      overheadPress: Math.floor(this.state.overheadPress / 2.5) * 2.5,
      deadlift: Math.floor(this.state.deadlift / 2.5) * 2.5
    };
    const userId = this.props.user.id;
    new Promise((resolve) => {
      resolve(this.props.startSetEditData5x5(userId, data))
    }).then(value => {
      value && history.goBack();
    })
  };

  onCancel = () => {
    history.goBack();
  };

  userData = this.props.user.workouts.strongLifts

  render() {
    return (
      <div className="content-container">

        {/* Header */}
        <h1 className="text-center margin-top">Hello {this.props.user.firstName}</h1>
        {this.userData ?
          <div>
            <h2 className="text-center">Enter new weights</h2>
            <p className="text-center">If it's too ease, you can increse weight, but not too much</p>
            <p className="text-center">After long break, you should reduce weight</p>
          </div>
          :
          <div>
            <h2 className="text-center">What is max weight you can lift 5 times?</h2>
            <p className="text-center">If you never tried an exercise, leave weight field blank</p>
          </div>
        }

        {/* Input fields */}
        <div>
          <div className="column-row">
            <label className="text-input input5x5">
              Squat: 5x <input
                type="text"
                onChange={this.onSquatChange}
                className="inline-input"
                placeholder="0"
                value={this.state.squat}
              /> kg
          </label>
            <label className="text-input input5x5">
              Bench Press: 5x <input
                type="text"
                onChange={this.onBenchPressChange}
                className="inline-input"
                placeholder="0"
                value={this.state.benchPress}
              /> kg
          </label>
            <label className="text-input input5x5">
              Barbell Row: 5x <input
                type="text"
                onChange={this.onBarbellRowChange}
                className="inline-input"
                placeholder="0"
                value={this.state.barbellRow}
              /> kg
          </label>
          </div>
          <div className="column-row">
            <label className="text-input input5x5">
              Overhead Press: 5x <input
                type="text"
                onChange={this.onOverheadPressChange}
                className="inline-input"
                placeholder="0"
                value={this.state.overheadPress}
              /> kg
          </label>
            <label className="text-input input5x5">
              Deadlift: 5x <input
                type="text"
                onChange={this.onDeadliftChange}
                className="inline-input"
                placeholder="0"
                value={this.state.deadlift}
              /> kg
          </label>
          </div>
        </div>
        {/* Recommended weights */}
        {!this.userData &&
          <div>
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
                : 30}kg</h3>
            </div>
            <div className="flex-center">
              <h3 className="margin-right">Overhead Press: {this.state.overheadPress ?
                Math.round(this.state.overheadPress * 0.3) * 2.5
                : 20}kg</h3>
              <h3 className="margin-right">Deadlift: {this.state.deadlift ?
                Math.round(this.state.deadlift * 0.3) * 2.5
                : 40}kg</h3>
            </div>
          </div>
        }

        {/* Action Buttons */}
        <div className="form-submit">
          {this.userData ?
            <button className="btn-save" onClick={this.onEdit}>
              <FontAwesomeIcon icon={faSave} /> Update data
          </button>
            :
            <button className="btn-save" onClick={this.onSave}>
              <FontAwesomeIcon icon={faSave} /> Save initial data
          </button>
          }
          <button className="btn-cancel form-cancel" onClick={this.onCancel}>
            <FontAwesomeIcon icon={faBan} /> Cancel
          </button>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  startSetEditData5x5: (userId, data) => dispatch(startSetEditData5x5(userId, data))
});

export default connect(undefined, mapDispatchToProps)(Workout5x5);
