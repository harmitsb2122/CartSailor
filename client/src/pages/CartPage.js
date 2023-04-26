import React from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name} ,`}
            </h1>
            <h4 className="text-center">
              <br />
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart is empty"}
            </h4>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row bg-dark text-white">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="200px"
                    height={"220px"}
                  />
                </div>
                <div className="col-md-8 border border-secondary p-4">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 300)} . . . </p>
                  <p>Price : {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Checkout</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            <br />
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5>Destination : {auth?.user?.address}</h5>
                </div>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => {
                    navigate("/payment", {
                      state: "/cart",
                    });
                  }}
                >
                  Order
                </button>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <h5>Destination : No address</h5>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
