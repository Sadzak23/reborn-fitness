import React from 'react';
import { connect } from 'react-redux';
import { faUsers, faStopwatch, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ListHeader, ListBody, ListFooter } from '../Elements/List';
import { BtnLinkCancel, BtnBackFullWidth } from '../Elements/Buttons';
import UserBlock from './UserBlock';

const UserSelect = ({ users, location }) => {
  const usersList = users.length === 0 ? (
    <p className="list-no-int">Please create user</p>
  ) : (
      users.map(user => <UserBlock user={user} location={location} key={user.id} />)
    );
  return (
    <div className="content-container">
      <ListHeader
        titleIcon={faUsers}
        titleTxt="Please select user"
        linkPath="/users"
        linkState={{ userCount: users.length }}
        linkIcon={faUserEdit}
      />
      <ListBody list={usersList} className="table-user-blocks" />
      <ListFooter />

      {location.pathname == "/user-select-timer" ?
        <BtnLinkCancel
          linkTxt="Select Timer"
          linkPath="/timers"
          linkState={{ activeUsers: users.filter(user => user.activeUser) }}
          linkIcon={faStopwatch}
        />
        :
        <BtnBackFullWidth />
      }
    </div>
  )
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(UserSelect);
