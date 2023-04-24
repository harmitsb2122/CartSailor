import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";

const CreateProduct = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Create Product</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
