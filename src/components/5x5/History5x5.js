import React from 'react';
import { connect } from 'react-redux';
import { ExerciseChart, RadarWeightsChart } from './ExerciseChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { BtnBackFullWidth } from '../Elements/Buttons';

export class History5x5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartViewType: "View All"
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

  chartColors = [
    { val: "View All", color: "#a0a0a0" },
    { val: "Barbell Row", color: "#ed1515" },
    { val: "Bench Press", color: "#3085d6" },
    { val: "Deadlift", color: "#845931" },
    { val: "Overhead Press", color: "#ff7f50" },
    { val: "Squat", color: "#34f7aa" }
  ]

  render() {
    // Rerender component on screen resize
    window.onresize = () => this.forceUpdate();

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
          <h2 className="history-header">
            {this.props.user.firstName}'s Strong Lift History
          </h2>
          {/* Legend */}
          <div className="legend">
            {this.chartColors.map(e =>
              <button
                style={{ background: e.color, }}
                onClick={() => this.setState({ chartViewType: e.val })}
                key={e.val}
              >{e.val}
              </button>
            )}
          </div>
          {/* Charts */}
          <ExerciseChart data={getWorkouts()} type={this.state.chartViewType} lines={this.chartColors} />
          <RadarWeightsChart data={progress} />
          {/* Back button */}
          <BtnBackFullWidth />
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
          <BtnBackFullWidth />
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