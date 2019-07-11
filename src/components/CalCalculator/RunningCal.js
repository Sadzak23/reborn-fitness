import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning } from '@fortawesome/free-solid-svg-icons';

export class RunningCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      metRunning: "6:00",
      duration: 0,
      calNo: 0,
      resultCal: 0,
      resultDuration: 0,
    }
  };

  met = {
    // pace: met
    "7:30": 8.3,
    "7:00": 9.1,
    "6:30": 9.5,
    "6:00": 10,
    "5:30": 10.6,
    "5:00": 11.7,
    "4:30": 12.1,
    "4:00": 12.9,
    "3:30": 15.8,
  };

  onCalculateDuration = () => {
    this.setState({
      resultCal: Math.round(this.state.user.weight * this.met[this.state.metRunning] * this.state.duration / 60)
    })
  };

  onCalculateCal = () => {
    this.setState({
      resultDuration: Math.round(this.state.calNo / this.state.user.weight / this.met[this.state.metRunning] * 60)
    })
  };

  onCaloriesChange = (e) => {
    const calNo = e.target.value;
    if (!calNo || calNo.match(/^\d{1,5}$/)) {
      this.setState({ calNo }, () => {
        this.onCalculateCal();
      });
    }
  };

  onDurationChange = (e) => {
    const duration = e.target.value;
    if (!duration || duration.match(/^\d{1,4}$/)) {
      this.setState({ duration }, () => {
        this.onCalculateDuration();
      });
    };
  };
  onMetChange = (e) => {
    const metRunning = e.target.value;
    this.setState({ metRunning }, () => {
      this.onCalculateDuration();
      this.onCalculateCal();
    });
  }

  render() {
    return (
        <div className="cal-activity">
          <FontAwesomeIcon icon={faRunning} size="4x" className="activity-icon" />
          <div className="cal-activity-options">
            {this.props.checkDuration ?
              <label className="text-input fit-content margin-right">
                Duration: <input
                  type="text"
                  onChange={this.onDurationChange}
                  autoComplete="off"
                  className="inline-input"
                  value={this.state.duration}
                /> min
              </label>
              :
              <label className="text-input fit-content margin-right">
                Calories:
                <input
                  type="text"
                  onChange={this.onCaloriesChange}
                  autoComplete="off"
                  className="inline-input5"
                  value={this.state.calNo}
                /> kCal
              </label>
            }

            <div>
              <label>
                Running Pace: <select
                  className="interval-select"
                  id="interval-type"
                  name="type"
                  onChange={this.onMetChange}
                  value={this.state.metRunning}
                >
                  <option value="7:30">7:30 min/km</option>
                  <option value="7:00">7:00 min/km</option>
                  <option value="6:30">6:30 min/km</option>
                  <option value="6:00">6:00 min/km</option>
                  <option value="5:30">5:30 min/km</option>
                  <option value="5:00">5:00 min/km</option>
                  <option value="4:30">4:30 min/km</option>
                  <option value="4:00">4:00 min/km</option>
                  <option value="3:30">3:30 min/km</option>
                </select>
              </label>
            </div>
          </div>
          {this.props.checkDuration ?
            <div>
              <h2 className="cal-result">If you ran for {this.state.duration} min,</h2>
              <h1 className="cal-result">You have burned: {this.state.resultCal} kCal</h1>
            </div>
            :
            <div>
              <h2 className="cal-result">To burn {this.state.calNo} kCal</h2>
              <h1 className="cal-result">You have to run for: {this.state.resultDuration} min</h1>
            </div>
          }
        </div>
    )
  }
};
