import React from 'react';
import { connect } from 'react-redux'


class Timer extends React.Component {
  constructor(props) {
    super(props);
    if (props.timer.warmupTime > 0) {
      this.state = {
        color: "#1dc4f2",
        intervalNo: -1,
        exerciseNo: 0,
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
        exerciseNo: 1,
        paused: true,
        phase: props.timer.intervals[0].intervalName,
        miliseconds: props.timer.intervals[0].intervalSec * 1000,
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
          miliseconds: this.props.timer.intervals[this.state.intervalNo + 1].intervalSec * 1000,
          type: this.props.timer.intervals[this.state.intervalNo + 1].intervalType,
          intervalNo: this.state.intervalNo + 1
        });

        // Exercise number  
        if (this.state.type === "exercise") {
          this.setState({
            exerciseNo: this.state.exerciseNo + 1
          });
        };
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
        console.log("beep, beep, beeeep!");
      };
    };

    // Play sound on 3,2,1
    if (this.state.miliseconds === 3000 || this.state.miliseconds === 2000 || this.state.miliseconds === 1000) {
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
        miliseconds: this.props.timer.intervals[this.state.intervalNo + 1].intervalSec * 1000,
        type: this.props.timer.intervals[this.state.intervalNo + 1].intervalType,
        intervalNo: this.state.intervalNo + 1
      });
      // if (this.state.type === "exercise") {
      //   this.setState({
      //     exerciseNo: this.state.exerciseNo + 1
      //   });
      // };
    };
  };

  handlePrevious = () => {
    if (this.state.intervalNo > 0) {
      this.setState({
        color: this.props.timer.intervals[this.state.intervalNo - 1].intervalColor,
        phase: this.props.timer.intervals[this.state.intervalNo - 1].intervalName,
        miliseconds: this.props.timer.intervals[this.state.intervalNo - 1].intervalSec * 1000,
        type: this.props.timer.intervals[this.state.intervalNo - 1].intervalType,
        intervalNo: this.state.intervalNo - 1
      });
      if (this.state.type === "exercise") {
        this.setState({
          exerciseNo: this.state.exerciseNo - 1
        });
      };
    };
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Timer</h1>
          </div>
        </div>
        <div className="content-container">
          <div style={{ backgroundColor: this.state.color }} className="timer-clock">
            <h1>{Math.ceil(this.state.miliseconds / 1000)}</h1>
          </div>
          <h3>- {this.state.phase} -</h3>
          <p>Interval: {this.state.intervalNo + 1}</p>
          <p>Exercise: {this.state.exerciseNo}</p>
          <p>Type: {this.state.type}</p>
          <button onClick={this.handlePrevious} className="button">Previous</button>
          <button onClick={this.togglePause} className="big-button">{this.state.paused ? 'Play' : 'Pause'}</button>
          <button onClick={this.handleNext} className="button">Next</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    timer: state.timers.find((timer) => timer.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(Timer);