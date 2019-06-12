import React from 'react';
import { connect } from 'react-redux';
import SingleTimer from './SingleTimer';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const TimersListPage = (props) => (
  <div>
    <div className="content-container list-body">
      <div className="list-header">
        <p>Select Timer Workout</p>
        <Link to="/create-timer">
        <FontAwesomeIcon icon={faPlusCircle} style={{ color: '#fff' }} size="2x" />
        </Link>
      </div>
      <div className="list-body">
        {
          props.timers.length === 0 ? (
            <p className="list-no-int">No timers</p>
          ) : (
              props.timers.map(timer =>
                (<SingleTimer
                  key={timer.id}
                  {...timer}
                />))
            )
        }
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  timers: state.timers
});

export default connect(mapStateToProps)(TimersListPage);