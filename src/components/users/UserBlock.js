import React from 'react';
import { Link } from 'react-router-dom';

const UserBlock = ({ user, location }) => {
  const links = () => {
    switch (location.pathname) {
      case "/user-select-cal":
        return {
          pathname: "calorie-calculator",
          state: user
        }
      case "user-select-5x5":
        return {
          pathname: "/dashboard5x5",
          state: {
            firstName: user.firstName,
            id: user.id
          }
        }
      default:
        break;
    }
  }
  const img = user.avatar ? user.avatar : 
  user.gender === "male" ? "/images/avatars/male.png" : "/images/avatars/female.png"
  return (
    <Link to={links()} className="user-block">
      <button className="user-block-btn">
        <img src={img} className="user-img" alt="Avatar-image" />
        <div>
          <h3>{user.firstName}</h3>
          <h4>{user.lastName}</h4>
        </div>
      </button>
    </Link>
  )
};

export default UserBlock