import CartItem from "./CartItem";
import type { CartItem as CartItemType } from "../types";
import { useContext } from "react";
import { AppContext } from "../providers/AppProvider";
import { ExchangeRateContext } from "../providers/ExchangeRateProvider";

interface CartItemsTableProps {
  items: CartItemType[];
}

const CartItemsTable = ({ items }: CartItemsTableProps) => {
  const { currency } = useContext(AppContext);
  const currencySymbol = currency === "USD" ? "$" : "€";
  const { rates } = useContext(ExchangeRateContext);
  const rate = rates[currency];
  const total: number = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
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
            key={item._id}
            title={item.title}
            quantity={item.quantity}
            price={item.price}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className="total">
            Total: {currencySymbol}
            {(total * rate).toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartItemsTable;
