import React from "react";
import uuid from 'uuid';
import SingleInterval from "./SingleInterval";
import { colorMap } from '../ColorMap';

export default class TimerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.timer ? props.timer.name : '',
      warmupTime: props.timer ? props.timer.warmupTime : 10,
      cooldownTime: props.timer ? props.timer.cooldownTime : 0,
      intervals: props.timer ? props.timer.workout : [],
      error: "",
      currentIntervalId: null,
      currentIntervalName: "",
      currentIntervalMin: 0,
      currentIntervalSec: 0,
      currentIntervalType: "exercise",
      currentIntervalColor: "#63d313",
      editInterval: false
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
      this.setState({
        intervals: [...this.state.intervals, {
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
        currentIntervalColor: "#63d313",
        currentIntervalId: null,
        editInterval: false
      });
    };
  };

  onRemoveInterval = (id) => {
    this.setState({ intervals: this.state.intervals.filter(interval => interval.key !== id) });
  };

  onEditInterval = (id, intervalName, intervalMin, intervalSec, intervalType, intervalColor) => {
    this.setState({
      currentIntervalId: id,
      currentIntervalName: intervalName,
      currentIntervalMin: intervalMin,
      currentIntervalSec: intervalSec,
      currentIntervalType: intervalType,
      currentIntervalColor: intervalColor,
      editInterval: true
    });
  };

  onReplaceInterval = () => {
    if (!this.state.currentIntervalName) {
      this.setState({ error: "Please provide name." });
    } else if (this.state.currentIntervalMin === 0 & this.state.currentIntervalSec === 0) {
      this.setState({ error: "Please set valid duration." })
    } else {
      this.setState({ error: "" });
      const newIntervals = this.state.intervals.map((interval) => {
        if (interval.key !== this.state.currentIntervalId) {
          return interval
        }
        return {
          key: this.state.currentIntervalId,
          intervalName: this.state.currentIntervalName,
          intervalMin: this.state.currentIntervalMin,
          intervalSec: this.state.currentIntervalSec,
          intervalType: this.state.currentIntervalType,
          intervalColor: this.state.currentIntervalColor
        }
      })
      this.setState({
        intervals: newIntervals,
        currentIntervalName: "",
        currentIntervalMin: 0,
        currentIntervalSec: 0,
        currentIntervalType: "exercise",
        currentIntervalColor: "#63d313",
        currentIntervalId: null,
        editInterval: false
      });
    }
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
          autoFocus
          autoComplete="off"
          className="text-input"
          name="workout-name"
          onChange={this.onNameChange}
          placeholder="Workout Name"
          type="text"
          value={this.state.description}
        />
        <div>
          <label htmlFor="warmup" className="form-label">Warmup Time</label>
          <input
            autoComplete="off"
            className="text-input interval-input"
            name="warmup"
            onChange={this.onWarmupChange}
            type="number"
            value={this.state.warmupTime}
          />
          <label htmlFor="cooldown" className="form-label">Cooldown Time</label>
          <input
            className="text-input"
            name="cooldown"
            onChange={this.onCooldownChange}
            type="number"
            value={this.state.cooldownTime}
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
                    onEdit={this.onEditInterval}
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
            autoComplete="off"
            className="interval-input"
            name="intervalName"
            id="interval-name"
            onChange={this.onIntervalNameChange}
            placeholder=""
            type="text"
            value={this.state.currentIntervalName}
          />
          <label htmlFor="min" className="form-label">Min</label>
          <input
            autoComplete="off"
            className="interval-time-set"
            id="interval-duration"
            min="0"
            onChange={this.onIntervalMinChange}
            placeholder="min"
            type="number"
            value={this.state.currentIntervalMin}
          />
          <label htmlFor="sec" className="form-label">Sec</label>
          <input
            autoComplete="off"
            className="interval-time-set"
            id="interval-duration"
            min="0"
            max="59"
            onChange={this.onIntervalSecChange}
            placeholder="sec"
            type="number"
            value={this.state.currentIntervalSec}
          />
          <select
            className="interval-input"
            id="interval-type"
            name="type"
            onChange={this.onIntervalTypeChange}
            value={this.state.currentIntervalType}
          >
            <option value="exercise">Exercise</option>
            <option value="rest">Rest</option>
          </select>
          <select
            className="interval-input"
            name="color"
            id="interval-color"
            onChange={this.onIntervalColorChange}
            value={this.state.currentIntervalColor}
          >
            <option value={Object.keys(colorMap)[0]}>{colorMap[Object.keys(colorMap)[0]]}</option>
            <option value={Object.keys(colorMap)[1]}>{colorMap[Object.keys(colorMap)[1]]}</option>
            <option value={Object.keys(colorMap)[2]}>{colorMap[Object.keys(colorMap)[2]]}</option>
            <option value={Object.keys(colorMap)[3]}>{colorMap[Object.keys(colorMap)[3]]}</option>
            <option value={Object.keys(colorMap)[4]}>{colorMap[Object.keys(colorMap)[4]]}</option>
          </select>
          <button disabled={!this.state.editInterval} onClick={this.onReplaceInterval}>Replace</button>
          <button className="big-button" onClick={this.onAddInterval}>Add Interval</button>
        </div>
        <div>
          <button className="big-button" onClick={this.onSubmit}>Save Timer</button>
        </div>
      </div>
    )
  }
};