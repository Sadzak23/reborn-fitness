import React from "react";
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import SingleInterval from "./SingleInterval";
import { colorMap } from '../ColorMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faPlusCircle, faSave, faClipboardList, faBan } from "@fortawesome/free-solid-svg-icons";

export default class TimerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.timer ? props.timer.name : '',
      warmupTime: props.timer ? props.timer.warmupTime : 10,
      intervals: props.timer ? props.timer.intervals : [],
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
          id: uuid(),
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
    this.setState({
      intervals: this.state.intervals.filter(interval => interval.id !== id),
      currentIntervalName: "",
      currentIntervalMin: 0,
      currentIntervalSec: 0,
      currentIntervalType: "exercise",
      currentIntervalColor: "#63d313",
      currentIntervalId: null,
      editInterval: false
    });
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
    this.state.currentIntervalId
  };

  onReplaceInterval = () => {
    if (!this.state.currentIntervalName) {
      this.setState({ error: "Please provide name." });
    } else if (this.state.currentIntervalMin === 0 & this.state.currentIntervalSec === 0) {
      this.setState({ error: "Please set valid duration." })
    } else {
      this.setState({ error: "" });
      const newIntervals = this.state.intervals.map((interval) => {
        if (interval.id !== this.state.currentIntervalId) {
          return interval
        }
        return {
          id: this.state.currentIntervalId,
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

  onAddTimer = () => {
    if (!this.state.name) {
      this.setState({ error: "Please provide name." });
    } else if (this.state.intervals.length === 0) {
      this.setState({ error: "Please add intervals." });
    }
    else {
      this.setState({ error: "" });
      this.props.onAddTimer({
        name: this.state.name,
        warmupTime: this.state.warmupTime,
        intervals: this.state.intervals
      });
    }
  };

  onEditTimer = () => {
    if (!this.state.name) {
      this.setState({ error: "Please provide name." });
    } else if (this.state.intervals.length === 0) {
      this.setState({ error: "Please add intervals." });
    }
    else {
      this.setState({ error: "" });
      this.props.onEditTimer(this.props.timer.id, {
        name: this.state.name,
        warmupTime: this.state.warmupTime,
        intervals: this.state.intervals
      });
    }
  };

  render() {
    return (
      <div className="form">
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <div className="form-header">
          <input
            autoFocus
            autoComplete="off"
            className="text-input form-timer-name"
            name="workout-name"
            onChange={this.onNameChange}
            placeholder="Workout Name"
            type="text"
            value={this.state.name}
          />
          <div>
            <label htmlFor="warmup" className="form-label">Warmup Time</label>
            <input
              autoComplete="off"
              className="text-input"
              name="warmup"
              onChange={this.onWarmupChange}
              type="number"
              value={this.state.warmupTime}
            />
          </div>
        </div>
        <div name="interval-list">
          <div className="list-header">
            <p><FontAwesomeIcon icon={faClipboardList} /> Intervals</p>
          </div>
          <div className="list-body">
            {this.state.intervals.length === 0 ? (
              <p className="list-no-int">No Intervals Added</p>
            ) : (
                this.state.intervals.map(interval =>
                  (<SingleInterval
                    editingClass={this.state.editInterval && this.state.currentIntervalId == interval.id && "form-edit-interval"}
                    onRemove={this.onRemoveInterval}
                    onEdit={this.onEditInterval}
                    key={interval.id}
                    {...interval}
                  />))
              )}
          </div>
        </div>

        <div className="form-interval">
          <input
            name="intervalName"
            autoComplete="off"
            className="margin-right-input form-interval-name"
            id="interval-name"
            onChange={this.onIntervalNameChange}
            placeholder="Interval name"
            type="text"
            value={this.state.currentIntervalName}
          />
          <input
            autoComplete="off"
            className="interval-time-set form-min"
            id="interval-minutes"
            min="0"
            onChange={this.onIntervalMinChange}
            type="number"
            value={this.state.currentIntervalMin}
          />
          <label htmlFor="interval-minutes" className="form-label"> min</label>
          <input
            autoComplete="off"
            className="interval-time-set"
            id="interval-seconds"
            min="0"
            max="59"
            onChange={this.onIntervalSecChange}
            type="number"
            value={this.state.currentIntervalSec}
          />
          <label htmlFor="interval-seconds" className="form-label"> sec</label>
          <select
            className="interval-select"
            id="interval-type"
            name="type"
            onChange={this.onIntervalTypeChange}
            value={this.state.currentIntervalType}
          >
            <option value="exercise">Exercise</option>
            <option value="rest">Rest</option>
          </select>
          <select
            className="interval-select"
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
          <button disabled={!this.state.editInterval} className="btn-replace-int" onClick={this.onReplaceInterval}>
            <FontAwesomeIcon icon={faSyncAlt} /> Replace
          </button>
          <button className="btn-add-int" onClick={this.onAddInterval}>
            <FontAwesomeIcon icon={faPlusCircle} /> Add New
          </button>
        </div>
        <div style={{ display: "flex" }}>
          {!this.props.timer ?
            <button className="btn-save" onClick={this.onAddTimer}>
              <FontAwesomeIcon icon={faSave} /> Add New Timer
          </button> :
            <button className="btn-save" onClick={this.onEditTimer}>
              <FontAwesomeIcon icon={faSave} /> Save Changes
          </button>}
          <Link className="form-cancel" to="/timers">
            <button className="btn-cancel">
              <FontAwesomeIcon icon={faBan} /> Cancel
          </button>
          </Link>
        </div>
      </div>
    )
  }
};