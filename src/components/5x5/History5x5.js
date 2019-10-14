import React from 'react';
import { connect } from 'react-redux';
import { ExerciseChart, RadarWeightsChart } from './ExerciseChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routers/AppRouter';

export class History5x5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartViewType: "View all"
    };
  };

  formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()}.${months[date.getMonth()]} '${date.getFullYear().toString().substr(-2)}.`
  }

  onChartViewTypeChange = (e) => {
    this.setState({ chartViewType: e.target.value })
  };

  render() {
    if (this.props.user.workouts.strongLifts) {
      const getWorkouts = () => {
        const history = this.props.user.workouts.history;
        const workout = [];
        Object.keys(history).forEach(e => {
          workout.push({
            id: this.formatDate(parseInt(e)),
            "Barbell Row": history[e]["Barbell Row"],
            "Bench Press": history[e]["Bench Press"],
            Deadlift: history[e].Deadlift,
            "Overhead Press": history[e]["Overhead Press"],
            Squat: history[e].Squat,
          })
        });
        return workout
      };
      const progress = {
        start: getWorkouts()[0],
        now: this.props.user.workouts.strongLifts
      }
      return (
        <div className="content-container">
          <FontAwesomeIcon icon={faAddressBook} size="7x" className="flex-self-center" />
          <h2 className="text-center">
            {this.props.user.firstName}'s Strong Lift History
          </h2>
          <div id="select-view">
            <select
              onChange={this.onChartViewTypeChange}
              value={this.state.chartViewType}
            >
              <option value="View all">View all</option>
              <option value="Barbell Row">Barbell Row</option>
              <option value="Bench Press">Bench Press</option>
              <option value="Squat">Squat</option>
              <option value="Deadlift">Deadlift</option>
              <option value="Overhead Press">Overhead Press</option>
            </select>
          </div>
          <ExerciseChart data={getWorkouts()} type={this.state.chartViewType} />
          <RadarWeightsChart data={progress} />
          <button className="btn-save" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faHandPointLeft} /> Back
          </button>
        </div>
      )
    } else {
      return (
        <div className="content-container">
          <FontAwesomeIcon icon={faAddressBook} size="7x" className="flex-self-center" />
          <h2 className="text-center">
            {this.props.user.firstName}'s Strong Lift History
          </h2>
          <div className="text-center margin-top">
            <h2>You haven't done any trainings yet</h2>
            <h3>Go back and start a workout to make history</h3>
          </div>
          <button className="btn-save margin-top" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faHandPointLeft} /> Back
          </button>
        </div>
      )
    }
  }
};

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) => user.id === props.location.state.id)
  };
};

export default connect(mapStateToProps)(History5x5);