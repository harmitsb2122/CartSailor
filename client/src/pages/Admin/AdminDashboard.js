import React from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/AdminMenu";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-4 dashboard">
        <div className="row">
          <div className="col-md-3 ">
            <AdminMenu />
          </div>
          <div className="col-md-8 ">
            <h3>Admin Details</h3>
            <div className="card w-75 h-26 p-4">
              <h4> Admin Name : {auth?.user?.name}</h4>
              <h4> Admin Email : {auth?.user?.email}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
