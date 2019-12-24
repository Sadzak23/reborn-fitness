import React from 'react';
import { connect } from 'react-redux';
import { formatSeconds } from '../Elements/ExportFunctions';
import { faForward, faBackward, faPause, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { onExit } from '../Elements/Alerts';
import { colorMap } from '../Elements/ColorMap';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    if (props.timer.warmupTime > 0) {
      this.state = {
        color: "#1dc4f2",
        intervalNo: -1,
        paused: true,
        phase: "Warmup",
        seconds: props.timer.warmupTime,
        totalSeconds: props.timer.warmupTime,
        type: "warmup",
        timerRun: null,
        timeStamp: null
      }
    } else {
      this.state = {
        color: props.timer.intervals[0].intervalColor,
        intervalNo: 0,
        paused: true,
        phase: props.timer.intervals[0].intervalName,
        seconds: props.timer.intervals[0].intervalSec + props.timer.intervals[0].intervalMin * 60,
        remainingSeconds: props.timer.intervals[0].intervalSec + props.timer.intervals[0].intervalMin * 60,
        totalSeconds: props.timer.intervals[0].intervalSec + props.timer.intervals[0].intervalMin * 60,
        type: props.timer.intervals[0].intervalType,
        timerRun: null,
        timeStamp: null
      }
    };
  };

  // Get all intervals
  getIntervals = () => {
    let intervals = []
    for (let i = 1; i <= this.props.timer.rounds; i++) {
      const rest = {
        intervalColor: Object.keys(colorMap)[3],
        intervalMin: this.props.timer.roundRestMin,
        intervalName: `Round ${i} complete`,
        intervalSec: this.props.timer.roundRestSec,
        intervalType: "rest"
      }
      this.props.timer.intervals.map(e => intervals.push(e))
      i < this.props.timer.rounds && intervals.push(rest)
    }
    return intervals
  };
  // All timer intervals
  intervals = this.getIntervals();

  // Load Sound
  beep = new Audio('../assets/beep.mp3');
  longBeep = new Audio('../assets/beep0.mp3');

  tick = () => {
    this.setState({
      seconds: this.state.totalSeconds - Math.round((Date.now() - this.state.timeStamp) / 1000)
    })
    //Next interval
    if (this.state.seconds <= 0) {
      this.handleNext();
      this.longBeep.play();  // Play sound on 0
      // Last interval
      if (this.state.intervalNo + 1 === this.intervals.length) {
        if (this.state.seconds <= 0) {
          this.onStopTimer();
          this.longBeep.play();  // Play sound on END TIMER
        };
      };
    };
    // Play sound on 3,2,1
    (this.state.seconds === 3 || this.state.seconds === 2 || this.state.seconds === 1) && this.beep.play();
    // Play sound on 10
    (this.state.seconds === 10 && this.state.totalSeconds >= 15) && this.beep.play();
  };

  togglePause = () => {
    this.state.paused ? this.onRunTimer() : this.onStopTimer();
  };

  onRunTimer = () => {
    this.setState({
      paused: false,
      timerRun: setInterval(this.tick, 1000),
      timeStamp: Date.now()
    })
  };
  onStopTimer = () => {
    clearInterval(this.state.timerRun)
    this.setState({ paused: true, totalSeconds: this.state.seconds })
  };

  handleNext = () => {
    if (this.state.intervalNo + 1 < this.intervals.length) {
      if (!this.state.paused) {
        this.onStopTimer()
        this.onRunTimer()
      }
      this.setState({
        color: this.intervals[this.state.intervalNo + 1].intervalColor,
        phase: this.intervals[this.state.intervalNo + 1].intervalName,
        seconds: this.intervals[this.state.intervalNo + 1].intervalSec + this.intervals[this.state.intervalNo + 1].intervalMin * 60,
        totalSeconds: this.intervals[this.state.intervalNo + 1].intervalSec + this.intervals[this.state.intervalNo + 1].intervalMin * 60,
        type: this.intervals[this.state.intervalNo + 1].intervalType,
        intervalNo: this.state.intervalNo + 1,
      });
    };
  };

  handlePrevious = () => {
    if (this.state.intervalNo > 0) {
      const interval = this.intervals[this.state.intervalNo - 1]
      this.setState({
        color: interval.intervalColor,
        phase: interval.intervalName,
        seconds: interval.intervalSec + interval.intervalMin * 60,
        totalSeconds: interval.intervalSec + interval.intervalMin * 60,
        type: interval.intervalType,
        intervalNo: this.state.intervalNo - 1,
        timeStamp: Date.now()
      });
    };
  };

  componentDidMount() {
    document.body.style.background = this.state.color;
  };
  componentDidUpdate() {
    document.body.style.background = this.state.color;
  };
  componentWillUnmount() {
    clearInterval(this.state.timerRun);
    document.body.style.background = null;
  };

  render() {
    //Exercise number calculator
    const exerciseNo = this.intervals.slice(0, this.state.intervalNo + 1).reduce((count, interval) =>
      interval.intervalType === "exercise" ? count + 1 : count, 0);
    //Total exercise number
    const totalExercisesNo = this.intervals.reduce((count, interval) =>
      interval.intervalType === "exercise" ? count + 1 : count, 0);
    //Elapsed Time
    const elapsedTime = this.intervals.slice(
      0, this.state.intervalNo + 1).reduce(
        (time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) -
      Math.ceil(this.state.seconds);
    //Remaining time
    const remainingTime = this.intervals.reduce((time, interval) => interval.intervalSec + interval.intervalMin * 60 + time, 0) - elapsedTime;

    return (
      //<button className="btn-x" onClick={onExit}>
      <div>
        <button className="btn-x" onClick={onExit}>
          <FontAwesomeIcon icon={faTimes} className="timer-x" />
        </button>
        <div className="content-container timer-container">
          <div>
            <h1 className="timer-clock">{formatSeconds(Math.ceil(this.state.seconds))}</h1>
            <h3 className="timer-interval-name">- {this.state.phase} -</h3>
          </div>
          <div>
            <div className="timer-intervals">
              <div>
                <p>Elapsed Time</p>
                <h2>{elapsedTime < 0 ? "00:00" : formatSeconds(elapsedTime)}</h2>
              </div>
              <div>
                <p>Exercise</p>
                <h2>{exerciseNo} / {totalExercisesNo}</h2>
              </div>
              <div>
                <p>Time Remaining</p>
                <h2>{formatSeconds(remainingTime)}</h2>
              </div>
            </div>
            <div className="timer-controls">
              <button onClick={this.handlePrevious} className="btn-next-prev">
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button onClick={this.togglePause} className={this.state.paused ? "btn-play" : "btn-pause"}>
                {this.state.paused ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}</button>
              <button onClick={this.handleNext} className="btn-next-prev">
                <FontAwesomeIcon icon={faForward} />
              </button>
            </div>
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
