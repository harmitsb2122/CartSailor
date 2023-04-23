import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <br />
          <br />
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action list-group-item-dark"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action list-group-item-dark"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action list-group-item-dark"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
