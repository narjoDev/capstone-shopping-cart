import CartItem from "./CartItem";
import type { CartItem as CartItemType } from "../types";

interface CartItemsTableProps {
  // TODO: should we only pick the props we need?
  items: CartItemType[];
}

const CartItemsTable = ({ items }: CartItemsTableProps) => {
  const total: number = items.reduce((sum, item) => sum + item.price, 0);
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
        {items.map((item) => (
          <CartItem
            title={item.title}
            quantity={item.quantity}
            price={item.price}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="total">
            Total: ${total.toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartItemsTable;
