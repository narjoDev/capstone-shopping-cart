import type { CartItem as CartItemType } from "../types";
import Cart from "./Cart";

interface ShopHeaderProps {
  cartItems: CartItemType[];
}

const ShopHeader = ({ cartItems }: ShopHeaderProps) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart items={cartItems} />
    </header>
  );
};

export default ShopHeader;
