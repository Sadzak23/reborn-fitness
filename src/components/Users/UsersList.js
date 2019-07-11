import React from 'react';
import { connect } from 'react-redux';
import SingleUser from './SingleUser';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

const UsersListPage = (props) => (
  <div>
    <div className="content-container list-body">
      <div className="list-header">
        <div className="flex">
          <FontAwesomeIcon icon={faUsers} size="2x" className="margin-right" />
          <p> Users List</p>
        </div>
        <Link to="/create-user">
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
                  key={user.id}
                  {...user}
                />))
            )
        }
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(UsersListPage);