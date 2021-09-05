import React from "react";
import {
  CartItemContainer,
  CartItemImage,
  CartItemDetailContainer,
} from "./cart-item.styles";

// import "./cart-item.styles.scss";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={imageUrl} alt="item" />
    <CartItemDetailContainer>
      <span>{name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </CartItemDetailContainer>
  </CartItemContainer>
);

export default CartItem;
