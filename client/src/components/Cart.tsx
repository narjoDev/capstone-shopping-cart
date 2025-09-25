import CartItemsTable from "./CartItemsTable";
import type { CartItem as CartItemType } from "../types";

interface CartProps {
  items: CartItemType[];
  onCheckout: () => void;
}

const Cart = ({ items, onCheckout }: CartProps) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <CartItemsTable items={items} />
      <div className="checkout-button">
        <button
          className="checkout"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
