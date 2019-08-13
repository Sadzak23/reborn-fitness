import React from "react";
import uuid from 'uuid';
import SingleInterval from "./SingleInterval";
import { history } from "../../routers/AppRouter";
import { colorMap } from '../ColorMap';
import { timerFormAlerts } from '../Alerts';
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
      currentIntervalMin: "",
      currentIntervalSec: "",
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
    const currentIntervalMin = e.target.value;
    if (!currentIntervalMin || currentIntervalMin.match(/^\d{1,3}$/)) {
      this.setState({ currentIntervalMin });
    };
  };
  onIntervalSecChange = (e) => {
    const currentIntervalSec = e.target.value;
    if (!currentIntervalSec || currentIntervalSec.match(/^\d{1,3}$/)) {
      this.setState({ currentIntervalSec });
    };
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
      swal(timerFormAlerts.intTitle, timerFormAlerts.intNoName, "error", { dangerMode: true, })
    } else if (this.state.currentIntervalMin === 0 & this.state.currentIntervalSec === 0 || this.state.currentIntervalMin === "" & this.state.currentIntervalSec === "") {
      swal(timerFormAlerts.intTitle, timerFormAlerts.intDuration, "error", { dangerMode: true, })
    } else {
      this.setState({
        intervals: [...this.state.intervals, {
          id: uuid(),
          intervalName: this.state.currentIntervalName,
          intervalMin: this.state.currentIntervalMin ? parseInt(this.state.currentIntervalMin) : 0,
          intervalSec: this.state.currentIntervalSec ? parseInt(this.state.currentIntervalSec) : 0,
          intervalType: this.state.currentIntervalType,
          intervalColor: this.state.currentIntervalColor
        }]
      });
      this.setState({
        currentIntervalName: "",
        currentIntervalMin: "",
        currentIntervalSec: "",
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
      swal(timerFormAlerts.intTitle, timerFormAlerts.intNoName, "error", { dangerMode: true, })
    } else if (this.state.currentIntervalMin === 0 & this.state.currentIntervalSec === 0) {
      swal(timerFormAlerts.intTitle, timerFormAlerts.intDuration, "error", { dangerMode: true, })
    } else {
      const newIntervals = this.state.intervals.map((interval) => {
        if (interval.id !== this.state.currentIntervalId) {
          return interval
        }
        return {
          id: this.state.currentIntervalId,
          intervalName: this.state.currentIntervalName,
          intervalMin: this.state.currentIntervalMin ? parseInt(this.state.currentIntervalMin) : 0,
          intervalSec: this.state.currentIntervalSec ? parseInt(this.state.currentIntervalSec) : 0,
          intervalType: this.state.currentIntervalType,
          intervalColor: this.state.currentIntervalColor
        }
      })
      this.setState({
        intervals: newIntervals,
        currentIntervalName: "",
        currentIntervalMin: "",
        currentIntervalSec: "",
        currentIntervalType: "exercise",
        currentIntervalColor: "#63d313",
        currentIntervalId: null,
        editInterval: false
      });
    }
  };

  onAddTimer = () => {
    if (!this.state.name) {
      swal(timerFormAlerts.title, timerFormAlerts.noName, "error", { dangerMode: true, })
    } else if (this.state.intervals.length === 0) {
      swal(timerFormAlerts.title, timerFormAlerts.noIntreval, "error", { dangerMode: true, })
    }
    else {
      this.props.onAddTimer({
        name: this.state.name,
        warmupTime: this.state.warmupTime,
        intervals: this.state.intervals
      });
    }
  };

  onEditTimer = () => {
    if (!this.state.name) {
      swal(timerFormAlerts.title, timerFormAlerts.noName, "error", { dangerMode: true, })
    } else if (this.state.intervals.length === 0) {
      swal(timerFormAlerts.title, timerFormAlerts.noIntreval, "error", { dangerMode: true, })
    }
    else {
      this.props.onEditTimer(this.props.timer.id, {
        name: this.state.name,
        warmupTime: this.state.warmupTime,
        intervals: this.state.intervals
      });
    }
  };

  onCancel = () => {
    history.goBack();
  };

  render() {
    return (
      <div className="form">
        <div className="form-header">
          <input
            name="workout-name"
            autoFocus
            autoComplete="off"
            className="text-input form-timer-name"
            onChange={this.onNameChange}
            placeholder="Workout Name"
            type="text"
            value={this.state.name}
          />
          <div className="flex">
            <label className="text-input fit-content">
              Warmup Time: <input
                type="text"
                onChange={this.onWarmupChange}
                autoComplete="off"
                className="inline-input2"
                value={this.state.warmupTime} /> sec
            </label>
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

        <div className="flex">
          <input
            id="interval-name"
            autoComplete="off"
            className="margin-right text-input form-interval-name"
            onChange={this.onIntervalNameChange}
            placeholder="Interval name"
            type="text"
            value={this.state.currentIntervalName}
          />
          <div className="flex">
            <label className="margin-right text-input fit-content">
              <input
                type="text"
                onChange={this.onIntervalMinChange}
                autoComplete="off"
                className="inline-input"
                id="interval-minutes"
                placeholder="0"
                value={this.state.currentIntervalMin} /> min
            </label>
            <label className="margin-right text-input fit-content">
              <input
                type="text"
                onChange={this.onIntervalSecChange}
                autoComplete="off"
                className="inline-input"
                id="interval-seconds"
                placeholder="0"
                value={this.state.currentIntervalSec} /> sec
            </label>
          </div>
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
          <button className="btn-cancel form-cancel" onClick={this.onCancel}>
            <FontAwesomeIcon icon={faBan} /> Cancel
          </button>
        </div>
      </div>
    )
  }
};
