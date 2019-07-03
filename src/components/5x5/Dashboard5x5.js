import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faAddressBook } from '@fortawesome/free-solid-svg-icons';

export default class Dashboard5x5 extends React.Component {
  render() {
    return (
      <div className="content-container">
        <div className="list-header">
          <p>Strong Lifts 5x5</p>
        </div>
        <Link className="list-dashboard" to="/workout5x5">
          <FontAwesomeIcon icon={faDumbbell} /> Start Workout
      </Link>
        <Link className="list-dashboard" to="/history5x5">
          <FontAwesomeIcon icon={faAddressBook} /> View History
      </Link>
      </div>
    )
  }
};