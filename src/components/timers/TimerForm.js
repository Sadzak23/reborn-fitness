import React from "react";
import uuid from 'uuid';
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faPlusCircle, faSave, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { history } from "../../routers/AppRouter";
import { colorMap } from '../Elements/ColorMap';
import { timerFormAlerts } from '../Elements/Alerts';
import { add0 } from "../Elements/ExportFunctions";
import { BtnConfirmCancel } from "../Elements/Buttons";
import SingleInterval from "./SingleInterval";

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
      currentIntervalColor: Object.keys(colorMap)[0],
      editInterval: false,
      rounds: props.timer && props.timer.rounds ? props.timer.rounds : "",
      roundRestMin: props.timer && props.timer.roundRestMin ? props.timer.roundRestMin : "",
      roundRestSec: props.timer && props.timer.roundRestSec ? add0(props.timer.roundRestSec) : "",
    };
  };
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState({ name });
  };
  onWarmupChange = (e) => {
    const warmupTime = e.target.value;
    if (!warmupTime || warmupTime.match(/^\d{1,3}$/)) {
      this.setState({ warmupTime });
    }
  };

  onRoundNoChange = (e) => {
    const rounds = e.target.value;
    if (!rounds || rounds.match(/^[1-9]\d{0,1}$/)) {
      this.setState({ rounds });
    }
  };

  onRoundRestMinChange = (e) => {
    const roundRestMin = e.target.value;
    if (!roundRestMin || roundRestMin.match(/^\d{1,3}$/)) {
      this.setState({ roundRestMin });
    }
  };
  onRoundRestSecChange = (e) => {
    const roundRestSec = add0(e.target.value);
    if (roundRestSec.match(/^[0-5]?[0-9]?$/)) {
      this.setState({ roundRestSec });
    }
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
    const currentIntervalSec = add0(e.target.value);
    if (currentIntervalSec.match(/^[0-5]?[0-9]?$/)) {
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
      Swal.fire(timerFormAlerts.intTitle, timerFormAlerts.intNoName, "error")
    } else if (this.state.currentIntervalMin === 0 & this.state.currentIntervalSec === 0 || this.state.currentIntervalMin === "" & this.state.currentIntervalSec === "") {
      Swal.fire(timerFormAlerts.intTitle, timerFormAlerts.intDuration, "error")
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
        currentIntervalColor: Object.keys(colorMap)[0],
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
      currentIntervalColor: Object.keys(colorMap)[0],
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
      Swal.fire(timerFormAlerts.intTitle, timerFormAlerts.intNoName, "error")
    } else if (this.state.currentIntervalMin === 0 & this.state.currentIntervalSec === 0) {
      Swal.fire(timerFormAlerts.intTitle, timerFormAlerts.intDuration, "error")
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
        currentIntervalColor: Object.keys(colorMap)[0],
        currentIntervalId: null,
        editInterval: false
      });
    }
  };

  onAddTimer = () => {
    if (!this.state.name) {
      Swal.fire(timerFormAlerts.title, timerFormAlerts.noName, "error")
    } else if (this.state.intervals.length === 0) {
      Swal.fire(timerFormAlerts.title, timerFormAlerts.noIntreval, "error")
    }
    else {
      this.props.onAddTimer({
        name: this.state.name,
        warmupTime: this.state.warmupTime ? parseInt(this.state.warmupTime) : 0,
        rounds: this.state.rounds ? parseInt(this.state.rounds) : 1,
        roundRestMin: this.state.roundRestMin ? parseInt(this.state.roundRestMin) : 0,
        roundRestSec: this.state.roundRestSec ? parseInt(this.state.roundRestSec) : 0,
        intervals: this.state.intervals,
        index: this.props.timersCount ? this.props.timersCount : 0
      });
    }
  };

  onEditTimer = () => {
    if (!this.state.name) {
      Swal.fire(timerFormAlerts.title, timerFormAlerts.noName, "error")
    } else if (this.state.intervals.length === 0) {
      Swal.fire(timerFormAlerts.title, timerFormAlerts.noIntreval, "error")
    }
    else {
      this.props.onEditTimer(this.props.timer.id, {
        name: this.state.name,
        warmupTime: this.state.warmupTime ? parseInt(this.state.warmupTime) : 0,
        rounds: this.state.rounds ? parseInt(this.state.rounds) : 1,
        roundRestMin: this.state.roundRestMin ? parseInt(this.state.roundRestMin) : 0,
        roundRestSec: this.state.roundRestSec ? parseInt(this.state.roundRestSec) : 0,
        intervals: this.state.intervals
      });
    }
  };

  onCancel = () => {
    history.goBack();
  };

  render() {
    return (
      <div>
        <div className="timer-form-header">
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
            <label className="text-input">
              Warmup Time:
              <input
                type="text"
                onChange={this.onWarmupChange}
                autoComplete="off"
                className="time-input-right"
                placeholder="0"
                value={this.state.warmupTime} /> sec
            </label>
          </div>
        </div>
        {/* Intervals header */}
        <div>
          <div className="list-header">
            <p><FontAwesomeIcon icon={faClipboardList} /> Intervals</p>
          </div>
          {/* Intervals list */}
          <div>
            {this.state.intervals.length === 0 ? (
              <p className="list-no-int">No Intervals Added</p>
            ) : (
                this.state.intervals.map(interval =>
                  (<SingleInterval
                    editingClass={this.state.editInterval && this.state.currentIntervalId == interval.id ? "form-edit-interval" : ""}
                    onRemove={this.onRemoveInterval}
                    onEdit={this.onEditInterval}
                    key={interval.id}
                    {...interval}
                  />))
              )}
          </div>
        </div>
        {/* Intervals settings */}
        <div className="list-int-form">
          <div className="flex-wrap">
            <input
              id="interval-name"
              autoComplete="off"
              className="int-form-input int-full-width"
              onChange={this.onIntervalNameChange}
              placeholder="Interval name"
              type="text"
              value={this.state.currentIntervalName}
            />
            <div className="flex-grow int-form-input">
              <label>Duration:
                <input
                  type="text"
                  onChange={this.onIntervalMinChange}
                  autoComplete="off"
                  className="time-input-right"
                  placeholder="min"
                  value={this.state.currentIntervalMin} />:
              </label>
              <label>
                <input
                  type="text"
                  onChange={this.onIntervalSecChange}
                  autoComplete="off"
                  className="time-input-left"
                  placeholder="sec"
                  value={this.state.currentIntervalSec} />
              </label>

            </div>
            <div className="flex-grow">
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
              {Object.keys(colorMap).map(color => <option value={color}>{colorMap[color]}</option>)}
              </select>
            </div>
          </div>
          <div className="flex">
            <button disabled={!this.state.editInterval} className="btn-replace-int" onClick={this.onReplaceInterval}>
              <FontAwesomeIcon icon={faSyncAlt} /> Replace
            </button>
            <button className="btn-add-int" onClick={this.onAddInterval}>
              <FontAwesomeIcon icon={faPlusCircle} /> Add New
            </button>
          </div>
        </div>
        {/* Round settings */}
        <div className="form-timer-rounds">
          <label className="int-form-input">
            Number of rounds:
            <input
              type="text"
              onChange={this.onRoundNoChange}
              autoComplete="off"
              className="time-input"
              id="interval-minutes"
              placeholder="1"
              value={this.state.rounds} />
          </label>
          <div className="int-form-input">
            <label>
              Rest:
              <input
                type="text"
                onChange={this.onRoundRestMinChange}
                autoComplete="off"
                className="time-input-right"
                placeholder="min"
                value={this.state.roundRestMin} />:
            </label>
            <label>
              <input
                type="text"
                onChange={this.onRoundRestSecChange}
                autoComplete="off"
                className="time-input-left"
                placeholder="sec"
                value={this.state.roundRestSec} />
            </label>
          </div>
        </div>
        {/* Submit/Cancel buttons */}
        {!this.props.timer ?
          <BtnConfirmCancel confirmFn={this.onAddTimer} confirmTxt="Create New Timer" confirmIcon={faSave} />
          :
          <BtnConfirmCancel confirmFn={this.onEditTimer} confirmTxt="Save Changes" confirmIcon={faSave} />
        }
      </div>
    )
  }
};
