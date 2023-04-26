import React from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const PaymentPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankId, setBankId] = useState("");
  const [uid, setUserId] = useState("");
  const navigate = useNavigate();
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserId(auth.user._id);
    try {
      if (!auth || !auth.token) {
        toast.error("Please Login First");
        navigate("/login");
      }
      if (!cart) {
        toast.error("Cart can't be empty");
        return;
      }
      const res = await axios.post(`${process.env.REACT_APP_API}/api/payment`, {
        name,
        cardNumber,
        cvv,
        bankId,
        cart,
        uid,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        toast.success(`Your current balance is : Rs ${res.data.balance}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="mx-auto w-50 p-5">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Payment Details Form</h4>

          <div className="mb-3 p-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
            />
          </div>

          <div className="mb-3 p-1">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Card Number"
              required
            />
          </div>
          <div className="mb-3 p-1">
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Cvv"
              required
            />
          </div>
          <div className="mb-3 p-1">
            <input
              type="text"
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Bank Id"
              required
            />
          </div>
          <button type="submit" className="btn btn-dark">
            PAY
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PaymentPage;
