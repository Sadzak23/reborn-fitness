import React from 'react';
import { connect } from 'react-redux';
import { ExerciseChart, RadarWeightsChart } from './ExerciseChart';

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

  getWorkouts = () => {
    const history = this.props.user.workouts.history;
    const workout = [{ id: "", "Barbell Row": 0, "Bench Press": 0, Deadlift: 0, "Overhead Press": 0, Squat: 0 }];
    Object.keys(history).forEach(e => {
      workout.push({
        id: this.formatDate(parseInt(e)),
        "Barbell Row": history[e].barbellRow,
        "Bench Press": history[e].benchPress,
        Deadlift: history[e].deadlift,
        "Overhead Press": history[e].overheadPress,
        Squat: history[e].squat,
      })
    });
    return workout
  };

  startWeights = {
    barbellRow: this.getWorkouts()[1]["Barbell Row"] ? this.getWorkouts()[1]["Barbell Row"] : this.getWorkouts()[2]["Barbell Row"],
    benchPress: this.getWorkouts()[1]["Bench Press"] ? this.getWorkouts()[1]["Bench Press"] : this.getWorkouts()[2]["Bench Press"],
    deadlift: this.getWorkouts()[1]["Deadlift"] ? this.getWorkouts()[1]["Deadlift"] : this.getWorkouts()[2]["Deadlift"],
    overheadPress: this.getWorkouts()[1]["Overhead Press"] ? this.getWorkouts()[1]["Overhead Press"] : this.getWorkouts()[2]["Overhead Press"],
    squat: this.getWorkouts()[1]["Squat"] ? this.getWorkouts()[1]["Squat"] : this.getWorkouts()[2]["Squat"],
  }

  onChartViewTypeChange = (e) => {
    this.setState({ chartViewType: e.target.value })
  };

  render() {
    return (
      <div className="content-container">
        <div>
          <h2>
            {this.props.user.firstName}'s Strong Lift History
          </h2>
        </div>
        <div>
          <select
            className="interval-select"
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
        <ExerciseChart data={this.getWorkouts()} type={this.state.chartViewType} />
        <RadarWeightsChart data={this.props.user.workouts.strongLifts} data2={this.startWeights} />        
      </div>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) => user.id === props.location.state.id)
  };
};

export default connect(mapStateToProps)(History5x5);