import React from 'react';
import { connect } from 'react-redux';
import { RunningCal } from './RunningCal'
import { CyclingCal } from './CyclingCal'
import { WalkincCal } from './WalkingCal'
import * as moment from 'moment';

export class CalCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      activity: "running",
    }
  };

  onActivitySelect = (e) => {
    const activity = e.target.value;
    this.setState({ activity });
  };

  Click = () => {
    this.setState({
      user: this.props.user,
      age: moment().diff(this.props.user.birthdate, 'years'),
      weight: this.props.user.weight
    })
  };

  render() {
    const activity = {
      "running": <RunningCal user={this.state.user} />,
      "cycling": <CyclingCal user={this.state.user} />,
      "walking": <WalkincCal user={this.state.user} />
    }
    return (
      <div className="content-container">
        {this.state.user ? (
          <div>
            <h1>Hi {this.state.user.firstName}</h1>
            <h3>Age: {this.state.age} - Weight: {this.state.user.weight}kg</h3>
          </div>
        ) : (<h3>Please Select user</h3>)
        }

        <button onClick={this.Click}>Click me</button>

        <select
          className="interval-select"
          id="activity-select"
          onChange={this.onActivitySelect}
        >
          <option value="running">
            Running
          </option>
          <option value="cycling">
            Cycling
          </option>
          <option value="walking">
            Walking
          </option>
        </select>

        {activity[this.state.activity]}

      </div>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) => user.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(CalCalculator);
