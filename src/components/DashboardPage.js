import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faDumbbell, faHeartbeat, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';

const DashboardPage = () => (
  <div className="content-container">
    <div className="list-header">
      <p>Welcome to Reborn Fitness App</p>
    </div>
    <Link className="list-dashboard" to="/users" onMouseDown={(e) => {e.preventDefault()}}>
      <FontAwesomeIcon icon={faUsers} /> Users
    </Link>
    <Link className="list-dashboard" to="/user-select-cal" onMouseDown={(e) => {e.preventDefault()}}>
      <FontAwesomeIcon icon={faHotjar} /> Cal Calculator
    </Link>
    <Link className="list-dashboard" to="/timers" onMouseDown={(e) => {e.preventDefault()}}>
      <FontAwesomeIcon icon={faStopwatch} /> Timer Workout
    </Link>
    <Link className="list-dashboard" to="/dashboard5x5" onMouseDown={(e) => {e.preventDefault()}}>
      <FontAwesomeIcon icon={faDumbbell} /> 5x5 Strong Lifts
    </Link>
    <Link className="list-dashboard" to="/dashboard" onMouseDown={(e) => {e.preventDefault()}}>
      <FontAwesomeIcon icon={faHeartbeat} /> HR Based Workout
    </Link>
    
  </div>
);

export default DashboardPage;