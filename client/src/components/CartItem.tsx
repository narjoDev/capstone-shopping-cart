import { useContext } from "react";
import { AppContext } from "../providers/AppProvider";
import type { CartItem as CartItemType } from "../types";

type CartItemProps = Pick<CartItemType, "title" | "quantity" | "price">;

const CartItem = ({ title, quantity, price }: CartItemProps) => {
  const { currency } = useContext(AppContext);
  const currencySymbol = currency === "USD" ? "$" : "€";

  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>
        {currencySymbol}
        {price.toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;
