import CartItemsTable from "./CartItemsTable";

const Cart = () => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <CartItemsTable />
      <div className="checkout-button">
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
