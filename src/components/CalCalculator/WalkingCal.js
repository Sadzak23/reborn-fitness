import React from 'react';
import { metWalking } from './Mets';
import { formatMinutes } from '../Format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking } from '@fortawesome/free-solid-svg-icons';

export class WalkingCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      metWalking: "slow",
      duration: "",
      calNo: "",
      resultCal: 0,
      resultDuration: 0,
    }
  };

  onCalculateDuration = () => {
    this.setState({
      resultCal: Math.round(this.state.user.weight * metWalking[this.state.metWalking] * this.state.duration / 60)
    })
  };

  onCalculateCal = () => {
    this.setState({
      resultDuration: Math.round(this.state.calNo / this.state.user.weight / metWalking[this.state.metWalking] * 60)
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
        <div className="cal-activity">
          <FontAwesomeIcon icon={faWalking} size="4x" className="activity-icon" />
          <div className="cal-activity-options">
            {this.props.checkDuration ?
              <label className="text-input fit-content margin-right">
                Duration: <input
                  type="text"
                  onChange={this.onDurationChange}
                  autoComplete="off"
                  className="inline-input"
                  placeholder="0"
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
                  placeholder="0"
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
          {this.props.checkDuration ?
            <div>
              <h2 className="cal-result">If you walked for {formatMinutes(this.state.duration ? this.state.duration : 0)} min,</h2>
              <h1 className="cal-result">You have burned: {this.state.resultCal} kCal</h1>
            </div>
            :
            <div>
              <h2 className="cal-result">To burn {this.state.calNo ? this.state.calNo : 0} kCal</h2>
              <h1 className="cal-result">You have to walk for {formatMinutes(this.state.resultDuration)} min</h1>
            </div>
          }
        </div>
    )
  }
};
