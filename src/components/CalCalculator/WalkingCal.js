import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking, faToggleOn } from '@fortawesome/free-solid-svg-icons';

export class WalkincCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      checkDuration: true,
      metWalking: "slow",
      duration: 0,
      calNo: 0,
      resultCal: 0,
      resultDuration: 0,
    }
  };

  met = {
    // speed: met
    "slow": 3.2,
    "moderate": 5,
    "fast": 8,
  };

  onResultType = () => {
    this.setState({ checkDuration: !this.state.checkDuration })
  };

  onCalculateDuration = () => {
    this.setState({
      resultCal: Math.round(this.state.user.weight * this.met[this.state.metWalking] * this.state.duration / 60)
    })
  };

  onCalculateCal = () => {
    this.setState({
      resultDuration: Math.round(this.state.calNo / this.state.user.weight / this.met[this.state.metWalking] * 60)
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
    const metWalking = e.target.value;
    this.setState({ metWalking }, () => {
      this.onCalculateDuration();
      this.onCalculateCal();
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.onResultType} className="btn-duration-cal">
          Duration
        <FontAwesomeIcon icon={faToggleOn} size="2x" className={this.state.checkDuration ? "fa-rotate-180 margin-xs" : "margin-xs"} />
          Calories
        </button>
        <div className="cal-activity">
          <FontAwesomeIcon icon={faWalking} size="4x" className="activity-icon" />
          <div className="cal-activity-options">
            {this.state.checkDuration ?
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
                Walking Speed: <select
                  className="interval-select"
                  id="interval-type"
                  name="type"
                  onChange={this.onMetChange}
                  value={this.state.metWalking}
                >
                  <option value="slow">Everyday walk</option>
                  <option value="moderate">Walking faster</option>
                  <option value="fast">Walking training</option>
                </select>
              </label>
            </div>
          </div>
          {this.state.checkDuration ?
            <div>
              <h2 className="cal-result">If you walked for {this.state.duration} min,</h2>
              <h1 className="cal-result">You have burned: {this.state.resultCal} kCal</h1>
            </div>
            :
            <div>
              <h2 className="cal-result">To burn {this.state.calNo} kCal</h2>
              <h1 className="cal-result">You have to walk for: {this.state.resultDuration} min</h1>
            </div>
          }
        </div>
      </div>
    )
  }
};
