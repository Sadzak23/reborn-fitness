import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser } from '../../actions/users';

const UserBlock = ({ user, location, editUser }) => {
  const links = () => {
    switch (location.pathname) {
      case "/user-select-cal":
        return {
          pathname: "calorie-calculator",
          state: user
        }
      case "/user-select-5x5":
        return {
          pathname: "/dashboard5x5",
          state: {
            firstName: user.firstName,
            id: user.id
          }
        }
    }
  };
  const img = user.avatar ? user.avatar :
    user.gender === "male" ? "/images/avatars/male.png" : "/images/avatars/female.png";

  const handleIsActive = () => {
    user.activeUser ? editUser(user.id, { activeUser: false }) : editUser(user.id, { activeUser: true });
  };

  if (location.pathname === "/user-select-timer") {
    const btnClass = user.activeUser ? "user-block-btn" : "user-block-btn inactive-btn";
    return (
      <div className="flex">
        <button className={btnClass} onClick={handleIsActive}>
          <img src={img} className="user-img" alt="Avatar-image" />
          <div>
            <h3>{user.firstName}</h3>
            <h4>{user.lastName}</h4>
          </div>
        </button>
      </div>
    )
  }
  else {
    return (
      <Link to={links()} className="flex">
        <button className="user-block-btn">
          <img src={img} className="user-img" alt="Avatar-image" />
          <div>
            <h3>{user.firstName}</h3>
            <h4>{user.lastName}</h4>
          </div>
        </button>
      </Link>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  editUser: (id, updates) => dispatch(editUser(id, updates))
});

export default connect(undefined, mapDispatchToProps)(UserBlock);