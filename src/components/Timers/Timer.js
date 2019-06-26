import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { faForward, faBackward, faPause, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    if (props.timer.warmupTime > 0) {
      this.state = {
        color: "#1dc4f2",
        intervalNo: -1,
        paused: true,
        phase: "Warmup",
        miliseconds: props.timer.warmupTime * 1000,
        type: "warmup",
        interval: null
      }
    } else {
      this.state = {
        color: props.timer.intervals[0].intervalColor,
        intervalNo: 0,
        paused: true,
        phase: props.timer.intervals[0].intervalName,
        miliseconds: props.timer.intervals[0].intervalSec * 1000 + props.timer.intervals[0].intervalMin * 60000,
        type: props.timer.intervals[0].intervalType,
        interval: null
      }
    };
  };

  tick = () => {
    this.setState({ miliseconds: this.state.miliseconds -= 100 })
    //Next interval
    if (this.state.intervalNo + 1 < this.props.timer.intervals.length) {
      if (this.state.miliseconds <= 0) {
        this.setState({
          color: this.props.timer.intervals[this.state.intervalNo + 1].intervalColor,
          phase: this.props.timer.intervals[this.state.intervalNo + 1].intervalName,
          miliseconds: this.props.timer.intervals[this.state.intervalNo + 1].intervalSec * 1000 + this.props.timer.intervals[this.state.intervalNo + 1].intervalMin * 60000,
          type: this.props.timer.intervals[this.state.intervalNo + 1].intervalType,
          intervalNo: this.state.intervalNo + 1
        });

        // Play sound on 0
        new Audio('../assets/beep0.mp3').play();
      };
    }

    // Last interval
    else {
      if (this.state.miliseconds <= 0) {
        clearInterval(this.state.interval);
        // Play sound on 0
        /////// END TIMER BEEP
        new Audio('../assets/beep0.mp3').play();
        this.setState({
          paused: true
        });
      };
    };

    // Play sound on 3,2,1
    if (this.state.miliseconds === 3000 || this.state.miliseconds === 2000 || this.state.miliseconds === 1000) {
      new Audio('../assets/beep.mp3').play();
    };

    // Play sound on 10
    if (this.state.miliseconds === 10000) {
      new Audio('../assets/beep.mp3').play();
    };
  };

  togglePause = () => {
    this.setState({
      paused: !this.state.paused
    });
    if (!this.state.paused) {
      clearInterval(this.state.interval);
    } else {
      this.setState({ interval: setInterval(this.tick, 100) });
    }
  };

  handleNext = () => {
    if (this.state.intervalNo + 1 < this.props.timer.intervals.length) {
      this.setState({
        color: this.props.timer.intervals[this.state.intervalNo + 1].intervalColor,
        phase: this.props.timer.intervals[this.state.intervalNo + 1].intervalName,
        miliseconds: this.props.timer.intervals[this.state.intervalNo + 1].intervalSec * 1000 + this.props.timer.intervals[this.state.intervalNo + 1].intervalMin * 60000,
        type: this.props.timer.intervals[this.state.intervalNo + 1].intervalType,
        intervalNo: this.state.intervalNo + 1
      });
    };
  };

  handlePrevious = () => {
    if (this.state.intervalNo > 0) {
      this.setState({
        color: this.props.timer.intervals[this.state.intervalNo - 1].intervalColor,
        phase: this.props.timer.intervals[this.state.intervalNo - 1].intervalName,
        miliseconds: this.props.timer.intervals[this.state.intervalNo - 1].intervalSec * 1000 + this.props.timer.intervals[this.state.intervalNo - 1].intervalMin * 60000,
        type: this.props.timer.intervals[this.state.intervalNo - 1].intervalType,
        intervalNo: this.state.intervalNo - 1
      });
    };
  };
  
  formatTime = (seconds) => {
    const add0 = (num) => ("0" + num).slice(-2);
    
    if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      return `${add0(minutes)}:${add0(seconds)}`;
    }
    else {
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      const hours = Math.floor(minutes / 60)
      minutes = minutes % 60;
      return `${add0(hours)}:${add0(minutes)}:${add0(seconds)}`;
    }
  };
  
  componentWillUnmount() {
    clearInterval(this.state.interval);
  };

  render() {
    //Exercise number calculator
    const exerciseNo = this.props.timer.intervals.slice(0, this.state.intervalNo + 1).reduce((count, interval) =>
      interval.intervalType === "exercise" ? count + 1 : count, 0);

    //Total exercise number
    const totalExercisesNo = this.props.timer.intervals.reduce((count, interval) =>
      interval.intervalType === "exercise" ? count + 1 : count, 0);

    //Elapsed Time
    const elapsedTime = this.props.timer.intervals.slice(
      0, this.state.intervalNo + 1).reduce(
        (time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) -
      Math.ceil(this.state.miliseconds / 1000);

    //Remaining time
    const remainingTime = this.props.timer.intervals.reduce((time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) - elapsedTime;

    return (
      <div style={{ backgroundColor: this.state.color }}>
        <Link to="/timers">
          <button className="btn-x">
            <FontAwesomeIcon icon={faTimes} className="timer-x" />
          </button>
        </Link>
        <div className="content-container timer-container">
          <h1 className="timer-clock">{this.formatTime(Math.ceil(this.state.miliseconds / 1000))}</h1>
          <h3 className="timer-interval-name">- {this.state.phase} -</h3>
          <div className="timer-intervals">
            <div>
              <h2>Interval: {this.state.intervalNo + 1}</h2>
              <h2>Exercise: {exerciseNo} / {totalExercisesNo}</h2>
            </div>
            <div>
              <h2>Elapsed Time: {elapsedTime < 0 ? "00:00" : this.formatTime(elapsedTime)}</h2>
              <h2>Time Remaining: {this.formatTime(remainingTime)}</h2>
            </div>
          </div>
          <p>Type: {this.state.type}</p>
          <div className="timer-controls">
            <button onClick={this.handlePrevious} className="btn-next-prev">
              <FontAwesomeIcon icon={faBackward} style={{ color: '#fff' }} />
            </button>
            <button onClick={this.togglePause} className={this.state.paused ? "btn-play" : "btn-pause"}>
              {this.state.paused ? <FontAwesomeIcon icon={faPlay} style={{ color: '#fff' }} /> : <FontAwesomeIcon icon={faPause} style={{ color: '#fff' }} />}</button>
            <button onClick={this.handleNext} className="btn-next-prev">
              <FontAwesomeIcon icon={faForward} style={{ color: '#fff' }} />
            </button>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, props) => {
  return {
    timer: state.timers.find((timer) => timer.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(Timer);