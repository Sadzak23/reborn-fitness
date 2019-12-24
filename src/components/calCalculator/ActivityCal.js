import React from 'react';
import { metActivity } from './CalMaps';
import { formatMinutes } from '../Elements/ExportFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';

export class ActivityCal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      activity: "Running",
      met: "6:00",
      checkDuration: true,
      duration: "",
      calNo: "",
      resultCal: 0,
      resultDuration: 0,
    }
  };

  onActivitySelect = (e) => {
    const activity = e.target.value;
    this.setState({ activity },
      () => {
        this.setState({ met: Object.keys(metActivity[this.state.activity].met)[1] },
          () => {
            this.onCalculateDuration();
            this.onCalculateCal();
          })
      });
  };

  onResultType = () => {
    this.setState({ checkDuration: !this.state.checkDuration })
  };

  onCalculateDuration = () => {
    this.setState({
      resultCal: Math.round(this.state.user.weight * metActivity[this.state.activity].met[this.state.met] * this.state.duration / 60)
    });
  };

  onCalculateCal = () => {
    this.setState({
      resultDuration: Math.round(this.state.calNo / this.state.user.weight / metActivity[this.state.activity].met[this.state.met] * 60)
    });
  };

  onCaloriesChange = (e) => {
    const calNo = e.target.value;
    if (!calNo || calNo.match(/^\d{1,5}$/)) {
      this.setState({ calNo }, () => {
        this.onCalculateCal();
      });
    };
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
    const met = e.target.value;
    this.setState({ met }, () => {
      this.onCalculateDuration();
      this.onCalculateCal();
    });
  };

  render() {
    return (
      <div>
        <div className="activity-controls">
          <select
            autoFocus
            className="activity-result-type"
            id="activity-select"
            onChange={this.onActivitySelect}
          >
            {Object.keys(metActivity).map(activity => <option value={activity} key={activity}>{activity}</option>)}
          </select>

          <button onClick={this.onResultType} className="activity-result-type">
            Duration
            <FontAwesomeIcon icon={faToggleOn} size="2x" className={this.state.checkDuration ? "fa-rotate-180 margin-xs" : "margin-xs"} />
            Calories
          </button>
        </div>
        <div className="cal-activity">
          <FontAwesomeIcon icon={metActivity[this.state.activity].icon} size="4x" className="activity-icon" />
          <div className="cal-activity-options">
            {this.state.checkDuration ?
              <label className="text-input cal-input">
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
              <label className="text-input cal-input">
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
                {metActivity[this.state.activity].intensityLabel}: <select
                  className="interval-select"
                  id="interval-type"
                  name="type"
                  onChange={this.onMetChange}
                  value={this.state.met}
                >
                  {Object.keys(metActivity[this.state.activity].met).map(activity => <option value={activity} key={activity}>{activity}</option>)}
                </select>
              </label>
            </div>
          </div>
          {this.state.checkDuration ?
            <div>
              <h2 className="cal-result">If you {metActivity[this.state.activity].resultLabel} for {formatMinutes(this.state.duration ? this.state.duration : 0)} min,</h2>
              <h2 className="cal-result">You would burn</h2>
              <h1 className="cal-result">{this.state.resultCal.toFixed().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,')} kCal</h1>
            </div>
            :
            <div>
              <h2 className="cal-result">To burn {this.state.calNo ? this.state.calNo.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,') : 0} kCal</h2>
              <h2 className="cal-result">You have to {metActivity[this.state.activity].resultLabel} for</h2>
              <h1 className="cal-result">{formatMinutes(this.state.resultDuration)} min</h1>
            </div>
          }
        </div>
      </div>
    )
  }
};
