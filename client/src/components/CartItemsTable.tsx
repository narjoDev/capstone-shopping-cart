import CartItem from "./CartItem";

const CartItemsTable = () => {
  return (
    <table className="cart-items">
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2].map(() => (
          <CartItem />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="total">
            Total: $729.98
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartItemsTable;
