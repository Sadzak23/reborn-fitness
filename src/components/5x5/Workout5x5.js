import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';
import { onExit, done5x5 } from '../Alerts'
import { formatSeconds } from '../Format';
import { Exercise5x5 } from './Exercise5x5';
import { startSetEditData5x5 } from '../../actions/users';
import { BtnConfirmCancel } from '../Elements/Buttons';

export class Workout5x5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workout: {
        type: this.props.user.workouts.strongLifts.trainingType,
        exercise1: {
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
          done: ""
        },
        exercise2: {
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
          done: ""
        },
        exercise3: {
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
          done: ""
        },
      },
      // Timer state
      interval: null,
      miliseconds: 0,

    }
  };

  ///////////////// Timer //////////////////////////////////////////
  beep = new Audio('../assets/beep.mp3');
  longBeep = new Audio('../assets/beep0.mp3');

  tick = () => {
    this.setState({ miliseconds: this.state.miliseconds -= 100 })
    // End Timer
    if (this.state.miliseconds <= 0) {
      clearInterval(this.state.interval);

      // Play sound on 0
      this.longBeep.play();
    };
    // Play sound on 3,2,1
    if (this.state.miliseconds === 3000 || this.state.miliseconds === 2000 || this.state.miliseconds === 1000) {
      this.beep.play();
    };
    // Play sound on 10
    if (this.state.miliseconds === 10000) {
      this.beep.play();
    };
  };

  runTimer = (exerciseNo, setNo) => {
    if (this.state.workout[exerciseNo][setNo] === 5) {
      clearInterval(this.state.interval);
      this.setState({
        miliseconds: 90000
      }, () => {
        this.setState({
          interval: setInterval(this.tick, 100)
        });
      });
    } else if (this.state.workout[exerciseNo][setNo] === 0) {
      clearInterval(this.state.interval);
      this.setState({
        miliseconds: 0
      });
    } else {
      clearInterval(this.state.interval);
      this.setState({
        miliseconds: 300000
      }, () => {
        this.setState({
          interval: setInterval(this.tick, 100)
        });
      });
    }
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  };

  /////////////////////////////////////////////////////////////////////////////
  onRepCount = (exerciseNo, setNo) => {
    if (this.state.workout[exerciseNo][setNo] === 0) {
      this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            [setNo]: 5
          }
        }
      }, () => {
        this.exerciseDone(exerciseNo, setNo);
      });
    } else {
      this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            [setNo]: this.state.workout[exerciseNo][setNo] - 1
          }
        }
      }, () => {
        this.exerciseDone(exerciseNo, setNo);
      });
    };
  };

  exerciseDone = (exerciseNo, setNo) => {
    if (this.state.workout[exerciseNo].set1 === 5 &&
      this.state.workout[exerciseNo].set2 === 5 &&
      this.state.workout[exerciseNo].set3 === 5 &&
      this.state.workout[exerciseNo].set4 === 5 &&
      this.state.workout[exerciseNo].set5 === 5) {
      clearInterval(this.state.interval);
      this.setState({
        miliseconds: 0,
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            done: "5x5"
          }
        }
      });
    } else if (this.state.workout[exerciseNo].set1 > 0 &&
      this.state.workout[exerciseNo].set2 > 0 &&
      this.state.workout[exerciseNo].set3 > 0 &&
      this.state.workout[exerciseNo].set4 > 0 &&
      this.state.workout[exerciseNo].set5 > 0) {
      clearInterval(this.state.interval);
      this.setState({
        miliseconds: 0,
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            done: "almost"
          }
        }
      });
    } else {
      this.setState({
        workout: {
          ...this.state.workout,
          [exerciseNo]: {
            ...this.state.workout[exerciseNo],
            done: ""
          }
        }
      }, () => this.runTimer(exerciseNo, setNo));
    }
  };

  onWorkoutSave = () => {
    const dataA = {
      exercise1: this.state.workout.exercise1.done,
      exercise2: this.state.workout.exercise2.done,
      exercise3: this.state.workout.exercise3.done,
      Squat: this.props.user.workouts.strongLifts.Squat,
      "Bench Press": this.props.user.workouts.strongLifts["Bench Press"],
      "Barbell Row": this.props.user.workouts.strongLifts["Barbell Row"]
    };
    const dataB = {
      exercise1: this.state.workout.exercise1.done,
      exercise2: this.state.workout.exercise2.done,
      exercise3: this.state.workout.exercise3.done,
      Squat: this.props.user.workouts.strongLifts.Squat,
      "Overhead Press": this.props.user.workouts.strongLifts["Overhead Press"],
      Deadlift: this.props.user.workouts.strongLifts.Deadlift
    };

    if (this.state.workout.type === 'a') {
      this.props.startSetEditData5x5(this.props.user.id, {
        history: {
          ...this.props.user.workouts.history,
          [Date.now()]: dataA
        },
        strongLifts: {
          ...this.props.user.workouts.strongLifts,
          Squat: dataA.exercise1 === "5x5" ? this.props.user.workouts.strongLifts.Squat + 2.5 : this.props.user.workouts.strongLifts.Squat,
          "Bench Press": dataA.exercise2 === "5x5" ? this.props.user.workouts.strongLifts["Bench Press"] + 2.5 : this.props.user.workouts.strongLifts["Bench Press"],
          "Barbell Row": dataA.exercise3 === "5x5" ? this.props.user.workouts.strongLifts["Barbell Row"] + 2.5 : this.props.user.workouts.strongLifts["Barbell Row"],
          trainingType: "b"
        }
      });
    } else {
      this.props.startSetEditData5x5(this.props.user.id, {
        history: {
          ...this.props.user.workouts.history,
          [Date.now()]: dataB
        },
        strongLifts: {
          ...this.props.user.workouts.strongLifts,
          Squat: dataB.exercise1 === "5x5" ? this.props.user.workouts.strongLifts.Squat + 2.5 : this.props.user.workouts.strongLifts.Squat,
          "Overhead Press": dataB.exercise2 === "5x5" ? this.props.user.workouts.strongLifts["Overhead Press"] + 2.5 : this.props.user.workouts.strongLifts["Overhead Press"],
          Deadlift: dataB.exercise3 === "5x5" ? this.props.user.workouts.strongLifts.Deadlift + 5 : this.props.user.workouts.strongLifts.Deadlift,
          trainingType: "a"
        }
      });
    };
  };

  onDone = () => done5x5(this.state.workout, this.onWorkoutSave)

  render() {
    const exercise2Name = this.state.workout.type === 'a' ? "Bench Press" : "Overhead Press";
    const exercise2Weight = this.state.workout.type === 'a' ? this.props.user.workouts.strongLifts["Bench Press"] : this.props.user.workouts.strongLifts["Overhead Press"];
    const exercise3Name = this.state.workout.type === 'a' ? "Barbell Row" : "Deadlift";
    const exercise3Weight = this.state.workout.type === 'a' ? this.props.user.workouts.strongLifts["Barbell Row"] : this.props.user.workouts.strongLifts.Deadlift;

    return (
      <div className="content-container">
        <div className="header5x5 show-desktop">
          <Link to={`/edit-data5x5/${this.props.user.id}`} className="workout-bodyweight">
            <h2>Change Weights</h2>
          </Link>
          <div className="timer5x5">
            <h1>Rest: {formatSeconds(Math.ceil(this.state.miliseconds / 1000))}</h1>
          </div>
          <div className="workout-bodyweight">
            <h2>Body Weight: {this.props.user.weight}Kg</h2>
          </div>
        </div>

        <div className="header5x5 show-mobile">
          <Link to={`/edit-data5x5/${this.props.user.id}`} className="workout-weights">
            <h3>Change Weights</h3>
          </Link>
          <div className="workout-bodyweight">
            <h3>Body Weight: {this.props.user.weight}Kg</h3>
          </div>
        </div>
        <div className="timer5x5 show-mobile">
          <h1>Rest: {formatSeconds(Math.ceil(this.state.miliseconds / 1000))}</h1>
        </div>

        <div className="exercises5x5">
          {/* Exercise 1 */}
          <Exercise5x5
            exerciseName="Squat"
            exerciseWeight={this.props.user.workouts.strongLifts.Squat}
            exerciseNo="exercise1"
            exerciseSets={this.state.workout.exercise1}
            onRepCount={this.onRepCount}
          />
          {/* Exercise 2 */}
          <Exercise5x5
            exerciseName={exercise2Name}
            exerciseWeight={exercise2Weight}
            exerciseNo="exercise2"
            exerciseSets={this.state.workout.exercise2}
            onRepCount={this.onRepCount}
          />
          {/* Exercise 3 */}
          <Exercise5x5
            exerciseName={exercise3Name}
            exerciseWeight={exercise3Weight}
            exerciseNo="exercise3"
            exerciseSets={this.state.workout.exercise3}
            onRepCount={this.onRepCount}
          />
        </div>
        <BtnConfirmCancel
          confirmFn={this.onDone}
          confirmTxt="Save workout"
          confirmIcon={faSave}
          cancelTxt="Quit"
          cancelFn={onExit}
        />
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  startSetEditData5x5: (id, updates) => dispatch(startSetEditData5x5(id, updates))
});

export default connect(undefined, mapDispatchToProps)(Workout5x5);