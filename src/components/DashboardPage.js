import React from 'react';
import { Link } from 'react-router-dom'

const DashboardPage = () => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Dashboard</h1>
      </div>
    </div>
    <div className="content-container">
      <div className="list-header">
        <p>Welcome to Reborn Fitness App</p>
      </div>
      <Link className="list-item" to="/timers">
        Timers
      </Link>
    </div>
  </div>
);

export default DashboardPage;