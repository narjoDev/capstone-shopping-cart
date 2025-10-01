import { useContext } from "react";
import { AppContext } from "../providers/AppProvider";
import type { CartItem as CartItemType } from "../types";
import { ExchangeRateContext } from "../providers/ExchangeRateProvider";

type CartItemProps = Pick<CartItemType, "title" | "quantity" | "price">;

const CartItem = ({ title, quantity, price }: CartItemProps) => {
  const { currency } = useContext(AppContext);
  const currencySymbol = currency === "USD" ? "$" : "€";
  const { rates } = useContext(ExchangeRateContext);
  const rate = rates[currency];
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>
        {currencySymbol}
        {(price * rate).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;
