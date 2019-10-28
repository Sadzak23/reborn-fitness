import React from 'react';
import { connect } from 'react-redux';
import { faPlusCircle, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import SingleTimer from './SingleTimer';
import { ListHeader, ListBody, ListFooter } from '../Elements/List';

const TimersListPage = ({ timers }) => {
  const timersList = timers.length === 0 ? (
    <p className="list-no-int">No timers</p>
  ) : (
      timers.map(timer =>
        (<SingleTimer
          key={timer.id}
          {...timer}
          timers={timers}
        />))
    );
  return (
    <div className="content-container">
      <ListHeader
        titleIcon={faStopwatch}
        titleTxt="Select Timer Workout"
        linkPath="/create-timer"
        linkState={{ timersCount: timers.length }}
        linkIcon={faPlusCircle}
      />
      <ListBody list={timersList} />
      <ListFooter />
    </div>
  )
};

const mapStateToProps = (state) => ({
  timers: state.timers
});

export default connect(mapStateToProps)(TimersListPage);
