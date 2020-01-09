import React from 'react';
import { connect } from 'react-redux';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routers/AppRouter';
import { startSetEditData5x5 } from '../../actions/users';
import { BtnConfirmCancel } from '../Elements/Buttons';

export class Workout5x5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squat: this.userData ? this.userData.Squat : '',
      benchPress: this.userData ? this.userData["Bench Press"] : '',
      barbellRow: this.userData ? this.userData["Barbell Row"] : '',
      overheadPress: this.userData ? this.userData["Overhead Press"] : '',
      deadlift: this.userData ? this.userData.Deadlift : '',
    }
  };

  getMaxWeight = (value) => Math.round(value / 2.5) * 2.5  // Getting max value that is divisible by 2.5
  get75ofMaxWeight = (value) => Math.round(value * 0.3) * 2.5  // Getting 75% of max value that is divisible by 2.5
  exerciseCheck75 = (exercise, elseValue) => exercise ? this.get75ofMaxWeight(exercise) : elseValue

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
    const exercises = {
      Squat: this.exerciseCheck75(this.state.squat, 20),
      "Bench Press": this.exerciseCheck75(this.state.benchPress, 30),
      "Barbell Row": this.exerciseCheck75(this.state.barbellRow, 20),
      "Overhead Press": this.exerciseCheck75(this.state.overheadPress, 20),
      Deadlift: this.exerciseCheck75(this.state.deadlift, 40)
    }
    const data = {
      strongLifts: {
        trainingType: "a",
        ...exercises
      },
      history: {
        ...this.props.user.workouts.history,
        [Date.now()]: exercises
      }
    };
    this.props.startSetEditData5x5(this.props.user.id, data)
  };

  onEdit = () => {
    const data = {
      strongLifts: {
        Squat: this.getMaxWeight(this.state.squat),
        "Bench Press": this.getMaxWeight(this.state.benchPress),
        "Barbell Row": this.getMaxWeight(this.state.barbellRow),
        "Overhead Press": this.getMaxWeight(this.state.overheadPress),
        Deadlift: this.getMaxWeight(this.state.deadlift)
      }
    };
    const userId = this.props.user.id;
    new Promise((resolve) => {
      resolve(this.props.startSetEditData5x5(userId, data))
    }).then(value => {
      value && history.goBack();
    })
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
              <h3 className="margin-right">Squat: {this.exerciseCheck75(this.state.squat, 20)}</h3>
              <h3 className="margin-right">Bench Press: {this.exerciseCheck75(this.state.benchPress, 30)}</h3>
              <h3 className="margin-right">Barbell Row: {this.exerciseCheck75(this.state.barbellRow, 20)}</h3>
            </div>
            <div className="flex-center">
              <h3 className="margin-right">Overhead Press: {this.exerciseCheck75(this.state.overheadPress, 20)}</h3>
              <h3 className="margin-right">Deadlift: {this.exerciseCheck75(this.state.deadlift, 40)}</h3>
            </div>
          </div>
        }

        {/* Action Buttons */}
        {this.userData ?
          <BtnConfirmCancel confirmFn={this.onEdit} confirmTxt="Update data" confirmIcon={faSave} />
          :
          <BtnConfirmCancel confirmFn={this.onSave} confirmTxt="Save initial data" confirmIcon={faSave} />
        }
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  startSetEditData5x5: (userId, data) => dispatch(startSetEditData5x5(userId, data))
});

export default connect(undefined, mapDispatchToProps)(Workout5x5);
