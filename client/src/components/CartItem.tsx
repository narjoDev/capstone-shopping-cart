import type { CartItem as CartItemType } from "../types";

type CartItemProps = Pick<CartItemType, "title" | "quantity" | "price">;

const CartItem = ({ title, quantity, price }: CartItemProps) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>${price}</td>
    </tr>
  );
};

export default CartItem;
