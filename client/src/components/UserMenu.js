import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <br />
          <br />
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action list-group-item-dark"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action list-group-item-dark"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
