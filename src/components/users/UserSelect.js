import React from 'react';
import { connect } from 'react-redux';
import SingleUser from './SingleUser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

const UsersListSelect = (props) => (
  <div className="content-container list-body">
    <div className="list-header">
      <div className="flex">
        <FontAwesomeIcon icon={faUsers} size="2x" className="margin-right" />
        <h2> Please select user</h2>
      </div>
      <Link
        to={{
          pathname: "/create-user",
          userCount: props.users.length
        }}
        onMouseDown={(e) => { e.preventDefault() }}
      >
        <FontAwesomeIcon icon={faUserPlus} style={{ color: '#fff' }} size="2x" />
      </Link>
    </div>
    <div className="list-body">
      {
        props.users.length === 0 ? (
          <p className="list-no-int">Please create user</p>
        ) : (
            props.users.map(user =>
              (<SingleUser
                path={props.location.pathname}
                key={user.id}
                users={props.users}
                {...user}
              />))
          )
      }
    </div>
    {props.location.pathname == "/user-select-timer" && 
    <Link to={{
      pathname: "/timers",
      activeUsers: props.users.filter(user => user.activeUser)
    }}>
    <button className="btn-save margin-top">Select Timer</button>
    </Link>
    }
  </div>
);

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(UsersListSelect);
