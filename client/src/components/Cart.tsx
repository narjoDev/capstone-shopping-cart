import CartItemsTable from "./CartItemsTable";
import type { CartItem as CartItemType } from "../types";

interface CartProps {
  // TODO: should we only pick the props we need?
  items: CartItemType[];
}

const Cart = ({ items }: CartProps) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <CartItemsTable items={items} />
      <div className="checkout-button">
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
