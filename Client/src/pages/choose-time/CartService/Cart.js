import React, { useState, useEffect } from "react";
import style from "./Cart_style.module.css";

function Cart() {
  const cartsystem = sessionStorage.getItem("cart") || "[]";
  const [cartItems, setCartItems] = useState(JSON.parse(cartsystem) || []);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
    sessionStorage.setItem("depositAmount", totalAmount);
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
        <p>Total Bill: </p>
        <span className={style.total_amount}>${depositAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default Cart;
