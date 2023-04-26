import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  //inital details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-5">
          <img
            src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="500px"
            width={"300px"}
          />
        </div>
        <div className="col-md-7">
          <br />
          <h1 className="text-center">Product Details</h1>
          <br />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <br />
          <button class="btn btn-dark ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
