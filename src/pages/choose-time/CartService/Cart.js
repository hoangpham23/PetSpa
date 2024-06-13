// import { useState } from "react";

// function Cart() {
//   const cartsystem = localStorage.getItem("cart");
//   const [cartItems, setCartItems] = useState(JSON.parse(cartsystem) || []);
//   console.log("cart ne", cartItems);
//   localStorage.setItem(
//     "depositAmount",
//     cartItems.reduce((total, item) => total + item.price, 0)
//   );
//   const depositAmount = cartItems.reduce(
//     (total, item) => total + item.price,
//     0
//   );
//   return (
//     <>
//       <div className="cart_container">
//         <div className="cart_title">
//           <h2>YOUR SELECTED SERVICES:</h2>
//         </div>
//         <div className="cart_items">
//           <ul>
//             {cartItems.map((item, index) => (
//               <li key={index}>{item.name}</li>
//             ))}
//           </ul>
//         </div>
//         <div className="total_bill">
//           <p>Total Bill: {depositAmount}</p>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import style from "./Cart_style.module.css";

function Cart() {
  const cartsystem = localStorage.getItem("cart");
  const [cartItems, setCartItems] = useState(JSON.parse(cartsystem) || []);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
    localStorage.setItem("depositAmount", totalAmount);
  }, [cartItems]);

  const depositAmount = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className={style.cart_container}>
      <div className={style.cart_title}>
        <h2>Your Cart</h2>
      </div>
      <div className={style.cart_items}>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className={style.cart_item}>
              <span className={style.item_name}>{item.name}</span>
              <span className={style.item_price}>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.total_bill}>
        <p>
          Total Bill:{" "}
          <span className={style.total_amount}>
            ${depositAmount.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Cart;
