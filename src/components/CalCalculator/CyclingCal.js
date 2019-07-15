import React from 'react';
import { metCycling } from './Mets';
import { formatMinutes } from '../Format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiking } from '@fortawesome/free-solid-svg-icons';

export class CyclingCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      metCycling: "moderate",
      duration: "",
      calNo: "",
      resultCal: 0,
      resultDuration: 0,
    }
  };

  onCalculateDuration = () => {
    this.setState({
      resultCal: Math.round(this.state.user.weight * metCycling[this.state.metCycling] * this.state.duration / 60)
    })
  };

  onCalculateCal = () => {
    this.setState({
      resultDuration: Math.round(this.state.calNo / this.state.user.weight / metCycling[this.state.metCycling] * 60)
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
    const metCycling = e.target.value;
    this.setState({ metCycling }, () => {
      this.onCalculateDuration();
      this.onCalculateCal();
    });
  }

  render() {
    return (
        <div className="cal-activity">
          <FontAwesomeIcon icon={faBiking} size="4x" className="activity-icon" />
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
                Cycling Speed: <select
                  className="interval-select"
                  id="interval-type"
                  name="type"
                  onChange={this.onMetChange}
                  value={this.state.metCycling}
                >
                  <option value="slow">Joy ride</option>
                  <option value="light">Light effort</option>
                  <option value="moderate">Moderate effort</option>
                  <option value="fast">Heavy training</option>
                  <option value="race">Race</option>
                  <option value="sprint-race">Sprint race</option>
                </select>
              </label>
            </div>
          </div>
          {this.props.checkDuration ?
            <div>
              <h2 className="cal-result">If you cycled for {formatMinutes(this.state.duration ? this.state.duration : 0)} min,</h2>
              <h1 className="cal-result">You have burned: {this.state.resultCal} kCal</h1>
            </div>
            :
            <div>
              <h2 className="cal-result">To burn {this.state.calNo ? this.state.calNo : 0} kCal</h2>
              <h1 className="cal-result">You have to cycle for {formatMinutes(this.state.resultDuration)} min</h1>
            </div>
          }
        </div>
    )
  }
};
