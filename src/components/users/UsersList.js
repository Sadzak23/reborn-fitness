import React from 'react';
import { connect } from 'react-redux';
import { faUserPlus, faUsers, faStopwatch } from '@fortawesome/free-solid-svg-icons';
import SingleUser from './SingleUser';
import { ListHeader, ListBody, ListFooter } from '../Elements/List';
import { BtnLink } from '../Elements/Buttons';

const UsersListSelect = ({ users, location }) => {
  const usersList = users.length === 0 ? (
    <p className="list-no-int">Please create user</p>
  ) : (
      users.map(user =>
        (<SingleUser
          path={location.pathname}
          key={user.id}
          users={users}
          {...user}
        />))
    );
  return (
    <div className="content-container">
      <ListHeader
        titleIcon={faUsers}
        titleTxt="Please select user"
        linkPath="/create-user"
        linkState={{ userCount: users.length }}
        linkIcon={faUserPlus}
      />
      <ListBody list={usersList} />
      <ListFooter />

      {location.pathname == "/user-select-timer" &&
        <BtnLink
          linkPath="/timers"
          linkState={{ activeUsers: users.filter(user => user.activeUser) }}
          icon={faStopwatch}
        />
      }
    </div>
  )
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(UsersListSelect);
