import type { CartItem as CartItemType } from "../types";
import Cart from "./Cart";

interface ShopHeaderProps {
  cartItems: CartItemType[];
  onCheckout: () => void;
}

const ShopHeader = ({ cartItems, onCheckout }: ShopHeaderProps) => {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart items={cartItems} onCheckout={onCheckout} />
    </header>
  );
};

export default ShopHeader;
