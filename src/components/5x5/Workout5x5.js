import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faBan } from '@fortawesome/free-solid-svg-icons';
import { onExit, done5x5 } from '../Alerts'
import { formatSeconds } from '../Format';
import { Exercise5x5 } from './Exercise5x5';
import { startEditUser } from '../../actions/users';

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
  beep = new Audio('../assets/beep.mp3');
  longBeep = new Audio('../assets/beep0.mp3');

  ///////////////// Timer //////////////////////////////////////////

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
      squat: this.props.user.workouts.strongLifts.squat,
      benchPress: this.props.user.workouts.strongLifts.benchPress,
      barbellRow: this.props.user.workouts.strongLifts.barbellRow
    };
    const dataB = {
      exercise1: this.state.workout.exercise1.done,
      exercise2: this.state.workout.exercise2.done,
      exercise3: this.state.workout.exercise3.done,
      squat: this.props.user.workouts.strongLifts.squat,
      overheadPress: this.props.user.workouts.strongLifts.overheadPress,
      deadlift: this.props.user.workouts.strongLifts.deadlift
    };

    if (this.state.workout.type === 'a') {      
      this.props.startEditUser(this.props.user.id, {
        workouts: {
          ...this.props.user.workouts,
          history: {
            ...this.props.user.workouts.history,
            [Date.now()]: dataA
          },
          strongLifts: {            
            ...this.props.user.workouts.strongLifts,
            squat: dataA.exercise1 === "5x5" ? this.props.user.workouts.strongLifts.squat + 2.5 :this.props.user.workouts.strongLifts.squat,
            benchPress: dataA.exercise2 === "5x5" ? this.props.user.workouts.strongLifts.benchPress + 2.5 :this.props.user.workouts.strongLifts.benchPress,
            barbellRow: dataA.exercise3 === "5x5" ? this.props.user.workouts.strongLifts.barbellRow + 2.5 :this.props.user.workouts.strongLifts.barbellRow,
            trainingType: "b"
          }
        }
      });
    } else {
      this.props.startEditUser(this.props.user.id, {
        workouts: {
          ...this.props.user.workouts,
          history: {            
            ...this.props.user.workouts.history,
            [Date.now()]: dataB
          },
          strongLifts: {            
            ...this.props.user.workouts.strongLifts,
            squat: dataB.exercise1 === "5x5" ? this.props.user.workouts.strongLifts.squat + 2.5 :this.props.user.workouts.strongLifts.squat,
            overheadPress: dataB.exercise2 === "5x5" ? this.props.user.workouts.strongLifts.overheadPress + 2.5 :this.props.user.workouts.strongLifts.overheadPress,
            deadlift: dataB.exercise3 === "5x5" ? this.props.user.workouts.strongLifts.deadlift + 5 :this.props.user.workouts.strongLifts.deadlift,
            trainingType: "a"
          }
        }
      });
    };
  };

  onDone = () => done5x5(this.state.workout, this.onWorkoutSave)

  render() {
    const exercise2Name = this.state.workout.type === 'a' ? "Bench Press" : "Overhead Press";
    const exercise2Weight = this.state.workout.type === 'a' ? this.props.user.workouts.strongLifts.benchPress : this.props.user.workouts.strongLifts.overheadPress;
    const exercise3Name = this.state.workout.type === 'a' ? "Barbell Row" : "Deadlift";
    const exercise3Weight = this.state.workout.type === 'a' ? this.props.user.workouts.strongLifts.barbellRow : this.props.user.workouts.strongLifts.deadlift;

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
            exerciseWeight={this.props.user.workouts.strongLifts.squat}
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
        <div className="form-submit">
          <button className="btn-save" onClick={this.onDone}>
            <FontAwesomeIcon icon={faSave} /> Save workout
          </button>
          <button className="btn-cancel form-cancel" onClick={onExit}>
            <FontAwesomeIcon icon={faBan} /> Quit
          </button>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  startEditUser: (id, updates) => dispatch(startEditUser(id, updates))
});

export default connect(undefined, mapDispatchToProps)(Workout5x5);