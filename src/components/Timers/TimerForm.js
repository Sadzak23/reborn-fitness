import React from "react";
import uuid from 'uuid';
import SingleInterval from "./SingleInterval";

export default class TimerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.timer ? props.timer.name : '',
      warmupTime: props.timer ? props.timer.warmupTime : 10,
      cooldownTime: props.timer ? props.timer.cooldownTime : 0,
      intervals: props.timer ? props.timer.workout : [],
      error: "",
      currentIntervalName: "",
      currentIntervalMin: 0,
      currentIntervalSec: 0,
      currentIntervalType: "exercise",
      currentIntervalColor: "#63d313"
    };
  };
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState({
      name
    });
  };
  onWarmupChange = (e) => {
    const warmupTime = parseInt(e.target.value);
    this.setState({
      warmupTime
    });
  };
  onCooldownChange = (e) => {
    const cooldownTime = parseInt(e.target.value);
    this.setState({
      cooldownTime
    });
  };

  // Current Interval settings
  onIntervalNameChange = (e) => {
    const currentIntervalName = e.target.value;
    this.setState({ currentIntervalName });
  };
  onIntervalMinChange = (e) => {
    const currentIntervalMin = parseInt(e.target.value);
    this.setState({ currentIntervalMin });
  };
  onIntervalSecChange = (e) => {
    const currentIntervalSec = parseInt(e.target.value);
    this.setState({ currentIntervalSec });
  };
  onIntervalTypeChange = (e) => {
    const currentIntervalType = e.target.value;
    this.setState({ currentIntervalType });
  };
  onIntervalColorChange = (e) => {
    const currentIntervalColor = e.target.value;
    this.setState({ currentIntervalColor });
  };

  // Buttons
  onAddInterval = () => {
    if (!this.state.currentIntervalName) {
      this.setState({ error: "Please provide name." });
    } else if (this.state.currentIntervalMin === 0 & this.state.currentIntervalSec === 0) {
      this.setState({ error: "Please set valid duration." })
    } else {
      this.setState({ error: "" });
      this.setState({ intervals: [...this.state.intervals, {
        key: uuid(),
        intervalName: this.state.currentIntervalName,
        intervalMin: this.state.currentIntervalMin,
        intervalSec: this.state.currentIntervalSec,
        intervalType: this.state.currentIntervalType,
        intervalColor: this.state.currentIntervalColor
        }]
      });
      this.setState({
        currentIntervalName: "",
        currentIntervalMin: 0,
        currentIntervalSec: 0,
        currentIntervalType: "exercise",
        currentIntervalColor: "#63d313"
      });
    };
  };

  onRemoveInterval = (id) => {
    this.setState({ intervals: this.state.intervals.filter(interval => interval.key !== id) });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.name) {
      this.setState({ error: "Please provide name." });
    } else if (this.state.intervals.length === 0) {
      this.setState({ error: "Please add intervals." });
    }
    else {
      this.setState({ error: "" });
      this.props.onSubmit({
        id: uuid(),
        name: this.state.name,
        warmupTime: this.state.warmupTime,
        cooldownTime: this.state.cooldownTime,
        intervals: this.state.intervals
      });
    }
  };
  render() {
    return (
      <div className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          name="workout-name"
          className="text-input"
          type="text"
          placeholder="Workout Name"
          autoFocus
          value={this.state.description}
          onChange={this.onNameChange}
        />
        <div>
          <label htmlFor="warmup" className="form-label">Warmup Time</label>
          <input
            name="warmup"
            className="text-input interval-input"
            type="number"
            value={this.state.warmupTime}
            onChange={this.onWarmupChange}
          />
          <label htmlFor="cooldown" className="form-label">Cooldown Time</label>
          <input
            name="cooldown"
            className="text-input"
            type="number"
            value={this.state.cooldownTime}
            onChange={this.onCooldownChange}
          />
        </div>
        <div name="interval-list">
          <div className="list-header">
            <p className="show-mobile">Intervals</p>
            <p className="show-desktop">Interval</p>
            <p className="show-desktop">Duration</p>
          </div>
          <div className="list-body">
            {this.state.intervals.length === 0 ? (
              <p className="list-no-int">No Intervals Added</p>
            ) : (
                this.state.intervals.map(interval =>
                  (<SingleInterval
                    onRemove={this.onRemoveInterval}
                    key={interval.key}
                    id={interval.key}
                    {...interval}
                  />))
              )}
          </div>
        </div>

        <div className="add-interval">
          <label htmlFor="intervalName" className="form-label">Interval name</label>
          <input
            name="intervalName"
            className="interval-input"
            type="text"
            id="interval-name"
            placeholder=""
            autoComplete="off"
            value={this.state.currentIntervalName}
            onChange={this.onIntervalNameChange}
          />
          <label htmlFor="min" className="form-label">Min</label>
          <input
            className="interval-time-set"
            type="number"
            min="0"
            id="interval-duration"
            placeholder="min"
            autoComplete="off"
            value={this.state.currentIntervalMin}
            onChange={this.onIntervalMinChange}
          />
          <label htmlFor="sec" className="form-label">Sec</label>
          <input
            className="interval-time-set"
            type="number"
            min="0"
            max="59"
            id="interval-duration"
            placeholder="sec"
            autoComplete="off"
            value={this.state.currentIntervalSec}
            onChange={this.onIntervalSecChange}
          />
          <select
            className="interval-input"
            name="type"
            id="interval-type"
            value={this.state.currentIntervalType}
            onChange={this.onIntervalTypeChange}
          >
            <option value="exercise">Exercise</option>
            <option value="rest">Rest</option>
          </select>
          <select
            className="interval-input"
            name="color"
            id="interval-color"
            value={this.state.currentIntervalColor}
            onChange={this.onIntervalColorChange}
          >
            <option value="#63d313">Green</option>
            <option value="#2bd99f">Mint</option>
            <option value="#cccccc">Gray</option>
            <option value="#e62222">Red</option>
            <option value="#1dc4f2">Blue</option>
          </select>
          <button className="big-button" onClick={this.onAddInterval}>Add Interval</button>
        </div>
        <div>
          <button className="big-button" onClick={this.onSubmit}>Save Timer</button>
        </div>
      </div>
    )
  }
};