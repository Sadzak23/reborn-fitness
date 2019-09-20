import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faAddressBook, faUsers, faIdBadge } from '@fortawesome/free-solid-svg-icons';

export default class Dashboard5x5 extends React.Component {
  render() {
    return (
      <div className="content-container">
        <div className="list-header">
          <div className="flex-between">
            <div className="flex">
              <FontAwesomeIcon icon={faDumbbell} size="2x" className="margin-right" />
              <h2>Strong Lifts</h2>
            </div>
            <div className="flex">
              <p className="margin-right">{this.props.location.state.firstName}</p>
              <FontAwesomeIcon icon={faIdBadge} size="2x" />
            </div>
          </div>
        </div>
        <Link className="list-dashboard" to={`/workout5x5/${this.props.location.state.id}`} onMouseDown={(e) => { e.preventDefault() }}>
          <FontAwesomeIcon icon={faDumbbell} /> Start Workout
        </Link>
        <Link className="list-dashboard" to="/user-select-5x5" onMouseDown={(e) => { e.preventDefault() }}>
          <FontAwesomeIcon icon={faUsers} /> Change User
        </Link>
        <Link className="list-dashboard" to="/history5x5" onMouseDown={(e) => { e.preventDefault() }}>
          <FontAwesomeIcon icon={faAddressBook} /> View History
        </Link>
      </div>
    )
  }
};