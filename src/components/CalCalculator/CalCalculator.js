import React from 'react';
import { connect } from 'react-redux';
import { ActivityCal } from './ActivityCal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as moment from 'moment';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export class CalCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      age: moment().diff(props.user.birthdate, 'years'),
    }
  };

  onExit = () => {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="content-container">
        <button className="btn-x-header" onClick={this.onExit}>
          <FontAwesomeIcon icon={faTimes} className="timer-x" />
        </button>
          <div className="cal-user-info">
            <h1>Hi {this.state.user.firstName}</h1>
            <h3>Age: {this.state.age} - Weight: {this.state.user.weight}kg</h3>
          </div>
        <ActivityCal user={this.state.user} />
      </div>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    user: state.users.find((user) => user.id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(CalCalculator);
