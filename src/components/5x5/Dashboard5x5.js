import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faAddressBook, faUserCheck } from '@fortawesome/free-solid-svg-icons';

export default class Dashboard5x5 extends React.Component {
  render() {
    return (
      <div className="content-container">
        <div className="list-header">
          <div className="flex">
            <FontAwesomeIcon icon={faDumbbell} size="2x" className="margin-right" />
            <p>Strong Lifts 5x5</p>
          </div>
        </div>
        <Link className="list-dashboard" to="/workout5x5">
          <FontAwesomeIcon icon={faDumbbell} /> Start Workout
        </Link>
        <Link className="list-dashboard" to="/user-select-5x5">
          <FontAwesomeIcon icon={faUserCheck} /> Select User
        </Link>
        <Link className="list-dashboard" to="/history5x5">
          <FontAwesomeIcon icon={faAddressBook} /> View History
        </Link>
      </div>
    )
  }
};