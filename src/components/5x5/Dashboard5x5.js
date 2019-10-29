import React from 'react';
import { faDumbbell, faUsers, faIdBadge, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { ListHeader, ListBodyLinks, ListFooter } from '../Elements/List';

const Dashboard5x5 = ({ location }) => {
  const list = [
    {
      linkPath: `/workout5x5/${location.state.id}`,
      icon: faDumbbell,
      text: "Start Workout",
    }, {
      linkPath: "/user-select-5x5",
      icon: faUsers,
      text: "Change User",
    }, {
      linkPath: "/history5x5",
      linkState: { id: location.state.id },
      icon: faChartBar,
      text: "View History",
    },]
  return (
    <div className="content-container">
      <ListHeader
        titleIcon={faDumbbell}
        titleTxt="Strong Lifts"
        linkPath="/user-select-5x5"
        linkIcon={faIdBadge}
        linkTxt={location.state.firstName}
      />
      <ListBodyLinks list={list} />    
      <ListFooter />
    </div>
  )
}

export default Dashboard5x5