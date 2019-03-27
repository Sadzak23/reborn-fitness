import React from 'react';
import { Link } from 'react-router-dom'

const DashboardPage = () => (
  <div className="content-container">
  <Link className="list-item" to="/workouts">
    Workouts
  </Link>
  </div>
);

export default DashboardPage;