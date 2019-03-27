import React from 'react';
import { Link } from 'react-router-dom'

const WorkoutPage = () => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Workouts</h1>
      </div>
    </div>
    <div className="content-container list-body">
      <div className="list-header">
        <p>Select workout you want to do</p>
      </div>
      <Link className="list-item" to="/circuit">
        Circuit training
      </Link>
      <Link className="list-item" to="/5x5">
        Strong Lifts 5x5
      </Link>
    </div>
  </div>
);

export default WorkoutPage;