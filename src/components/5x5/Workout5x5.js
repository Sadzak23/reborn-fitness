import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routers/AppRouter';
import { formatSeconds } from '../Format';

export class Workout5x5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        squat: this.props.user.workouts.strongLifts.squat,
        benchPress: this.props.user.workouts.strongLifts.benchPress,
        barbellRow: this.props.user.workouts.strongLifts.barbellRow,
        overheadPress: this.props.user.workouts.strongLifts.overheadPress,
        deadLift: this.props.user.workouts.strongLifts.deadLift,
        bodyWeight: this.props.user.weight
      },
      workout: {
        type: this.props.user.workouts.strongLifts.trainingType,
        exercise1: {
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
        },
        exercise2: {
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
        },
        exercise3: {
          set1: 0,
          set2: 0,
          set3: 0,
          set4: 0,
          set5: 0,
        },
      },
      // Timer state
      interval: null,
      miliseconds: 0,
      paused: false,

    }
  };

  ///////////////// Timer //////////////////////////////////////////

  tick = () => {
    this.setState({ miliseconds: this.state.miliseconds -= 100 })
    // End Timer
    if (this.state.miliseconds <= 0) {
      clearInterval(this.state.interval);

      // Play sound on 0
      new Audio('../assets/beep0.mp3').play();
      this.setState({
        paused: true
      });
    };
    // Play sound on 3,2,1
    if (this.state.miliseconds === 3000 || this.state.miliseconds === 2000 || this.state.miliseconds === 1000) {
      new Audio('../assets/beep.mp3').play();
    };
    // Play sound on 10
    if (this.state.miliseconds === 10000) {
      new Audio('../assets/beep.mp3').play();
    };
  };

  togglePause = () => {
    this.setState({ paused: !this.state.paused });
    if (!this.state.paused) {
      clearInterval(this.state.interval);
    } else {
      this.setState({ interval: setInterval(this.tick, 100) });
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
      });
    }
  };
  runTimer = () => {
    clearInterval(this.state.interval);
    this.setState({
      miliseconds: 60000
    }, () => {
      this.setState({
        interval: setInterval(this.tick, 100)
      });
    });
  };
  /* Exercise 1 */
  onRepCountE1R1 = () => {
    this.onRepCount('exercise1', 'set1');
    this.runTimer();
  };
  onRepCountE1R2 = () => {
    this.onRepCount('exercise1', 'set2');
    this.runTimer();
  };
  onRepCountE1R3 = () => {
    this.onRepCount('exercise1', 'set3');
    this.runTimer();
  };
  onRepCountE1R4 = () => {
    this.onRepCount('exercise1', 'set4');
    this.runTimer();
  };
  onRepCountE1R5 = () => {
    this.onRepCount('exercise1', 'set5');
    this.runTimer();
  };

  /* Exercise 2 */
  onRepCountE2R1 = () => {
    this.onRepCount('exercise2', 'set1');
    this.runTimer();
  };
  onRepCountE2R2 = () => {
    this.onRepCount('exercise2', 'set2');
    this.runTimer();
  };
  onRepCountE2R3 = () => {
    this.onRepCount('exercise2', 'set3');
    this.runTimer();
  };
  onRepCountE2R4 = () => {
    this.onRepCount('exercise2', 'set4');
    this.runTimer();
  };
  onRepCountE2R5 = () => {
    this.onRepCount('exercise2', 'set5');
    this.runTimer();
  };

  /* Exercise 3 */
  onRepCountE3R1 = () => {
    this.onRepCount('exercise3', 'set1');
    this.runTimer();
  };
  onRepCountE3R2 = () => {
    this.onRepCount('exercise3', 'set2');
    this.runTimer();
  };
  onRepCountE3R3 = () => {
    this.onRepCount('exercise3', 'set3');
    this.runTimer();
  };
  onRepCountE3R4 = () => {
    this.onRepCount('exercise3', 'set4');
    this.runTimer();
  };
  onRepCountE3R5 = () => {
    this.onRepCount('exercise3', 'set5');
    this.runTimer();
  };

  onExit = () => swal({
    title: "You're not a quitter!",
    text: "Are you?!",
    icon: "warning",
    buttons: {
      cancel: "Cancel",
      exit: {
        text: "Yes, I quit!",
        value: "exit",
        className: "btn-alert-exit"
      },
    },
  }).then((value) =>
      value === "exit" && history.push("/")
    );

  render() {
    const exercise2Name = this.state.workout.type === 'a' ? "Bench Press" : "Overhead Press";
    const exercise2Weight = this.state.workout.type === 'a' ? this.state.userData.benchPress : this.state.userData.overheadPress;
    const exercise3Name = this.state.workout.type === 'a' ? "Barbell Row" : "Dead Lift";
    const exercise3Weight = this.state.workout.type === 'a' ? this.state.userData.barbellRow : this.state.userData.deadLift;

    return (
      <div className="content-container">
        <button className="btn-x" onClick={this.onExit}>
          <FontAwesomeIcon icon={faTimes} className="timer-x" />
        </button>

        <div className="header5x5">
          <Link to={`/edit-data5x5/${this.props.user.id}`} className="workout-bodyweight">
            <h2>Change Weights</h2>
          </Link>
          <div className="timer5x5">
            <h1>Rest: {formatSeconds(Math.ceil(this.state.miliseconds / 1000))}</h1>
          </div>
          <div className="workout-bodyweight">
            <h2>Body Weight: {this.state.userData.bodyWeight}Kg</h2>
          </div>
        </div>

        {/* Exercise 1 */}
        <div className="workout-exercise">
          <div className="exercise-title-5x5">
            <h2>Squat</h2>
            <h2>5x5 {this.state.userData.squat}kg</h2>
          </div>
          <div className="counter5x5">
            <button onClick={this.onRepCountE1R1} className="btn-exercise-count">{this.state.workout.exercise1.set1}</button>
            <button onClick={this.onRepCountE1R2} className="btn-exercise-count">{this.state.workout.exercise1.set2}</button>
            <button onClick={this.onRepCountE1R3} className="btn-exercise-count">{this.state.workout.exercise1.set3}</button>
            <button onClick={this.onRepCountE1R4} className="btn-exercise-count">{this.state.workout.exercise1.set4}</button>
            <button onClick={this.onRepCountE1R5} className="btn-exercise-count">{this.state.workout.exercise1.set5}</button>
          </div>
        </div>

        {/* Exercise 2 */}
        <div className="workout-exercise">
          <div className="exercise-title-5x5">
            <h2>{exercise2Name}</h2>
            <h2>5x5 {exercise2Weight}kg</h2>
          </div>
          <div className="counter5x5">
            <button onClick={this.onRepCountE2R1} className="btn-exercise-count">{this.state.workout.exercise2.set1}</button>
            <button onClick={this.onRepCountE2R2} className="btn-exercise-count">{this.state.workout.exercise2.set2}</button>
            <button onClick={this.onRepCountE2R3} className="btn-exercise-count">{this.state.workout.exercise2.set3}</button>
            <button onClick={this.onRepCountE2R4} className="btn-exercise-count">{this.state.workout.exercise2.set4}</button>
            <button onClick={this.onRepCountE2R5} className="btn-exercise-count">{this.state.workout.exercise2.set5}</button>
          </div>
        </div>

        {/* Exercise 3 */}
        <div className="workout-exercise">
          <div className="exercise-title-5x5">
            <h2>{exercise3Name}</h2>
            <h2>5x5 {exercise3Weight}kg</h2>
          </div>
          <div className="counter5x5">
            <button onClick={this.onRepCountE3R1} className="btn-exercise-count">{this.state.workout.exercise3.set1}</button>
            <button onClick={this.onRepCountE3R2} className="btn-exercise-count">{this.state.workout.exercise3.set2}</button>
            <button onClick={this.onRepCountE3R3} className="btn-exercise-count">{this.state.workout.exercise3.set3}</button>
            <button onClick={this.onRepCountE3R4} className="btn-exercise-count">{this.state.workout.exercise3.set4}</button>
            <button onClick={this.onRepCountE3R5} className="btn-exercise-count">{this.state.workout.exercise3.set5}</button>
          </div>
        </div>
      </div>
    )
  }
};


export default connect(undefined)(Workout5x5);