import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import SingleUser from './SingleUser';
import { ListHeader, ListBody, ListFooter } from '../Elements/List';

const UsersListSelect = (props) => {
  const usersList = props.users.length === 0 ? (
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
  return (
  <div className="content-container list-body">
    <ListHeader
    titleIcon={faUsers}
    titleTxt="Please select user"
    linkPath="/create-user"
    linkState= {{ userCount: props.users.length }}
    linkIcon={faUserPlus}
    />
    <ListBody list={usersList} />
    <ListFooter />
    {props.location.pathname == "/user-select-timer" && 
    <Link to={{
      pathname: "/timers",
      activeUsers: props.users.filter(user => user.activeUser)
    }}>
    <button className="btn-confirm margin-top">Select Timer</button>
    </Link>
    }
  </div>
)};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(UsersListSelect);
