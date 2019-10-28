import React from 'react';
import { faStopwatch, faDumbbell, faHeartbeat, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';
import { ListBodyLinks, ListFooter } from './Elements/List';

const DashboardPage = () => {
  const list = [
    {
      linkPath: "/users",
      icon: faUsers,
      text: "Users",
    }, {
      linkPath: "/user-select-cal",
      icon: faHotjar,
      text: "Cal Calculator",
    }, {
      linkPath: "/user-select-timer",
      icon: faStopwatch,
      text: "Timer Workout",
    }, {
      linkPath: "/user-select-5x5",
      icon: faDumbbell,
      text: "5x5 Strong Lifts",
    }, {
      linkPath: "/dashboard",
      icon: faHeartbeat,
      text: "HR Based Workout",
    },]
  return (
  <div className="content-container">
    <div className="list-header">
      <h2>Welcome to Reborn Fitness App</h2>
    </div>
    <ListBodyLinks list={list} />
    <ListFooter />
  </div>
)};

export default DashboardPage;