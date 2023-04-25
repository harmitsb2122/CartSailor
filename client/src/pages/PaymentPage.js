import React from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
const PaymentPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [BankId, setBankId] = useState("");

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   const res = await axios.post(
      //     `${process.env.REACT_APP_API}/api/auth/login`,
      //     {
      //       email,
      //       password,
      //     }
      //   );
      //   if (res && res.data.success) {
      //     toast.success(res.data && res.data.message);
      //     setAuth({
      //       ...auth,
      //       user: res.data.user,
      //       token: res.data.token,
      //     });
      //     localStorage.setItem("auth", JSON.stringify(res.data));
      //     navigate(location.state || "/");
      //   } else {
      //     toast.error(res.data.message);
      //   }
    } catch (error) {
      console.log(error);
      //   toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="mx-auto w-50 p-3">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Payment Details Form</h4>

          <div className="mb-3">
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

          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="mb-3">
            <input
              type="text"
              value={BankId}
              onChange={(e) => setBankId(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Bank Id"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            ORDER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PaymentPage;
