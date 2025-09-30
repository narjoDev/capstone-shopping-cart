import { useContext } from "react";
import type { CartItem as CartItemType } from "../types";
import Cart from "./Cart";
import { AppContext } from "../providers/AppProvider";

interface ShopHeaderProps {
  cartItems: CartItemType[];
  onCheckout: () => void;
}

const ShopHeader = ({ cartItems, onCheckout }: ShopHeaderProps) => {
  const { theme, handleThemeChange } = useContext(AppContext);
  const otherTheme = theme === "light" ? "dark" : "light";

  console.log(theme);

  return (
    <header>
      <h1>The Shop!</h1>
      <div className="header-controls">
        <button
          style={{ fontSize: "20px" }}
          onClick={() => handleThemeChange(otherTheme)}
        >
          {otherTheme === "light" ? "☀️" : "🌙"}
        </button>
        <button>USD</button>
      </div>
      <Cart items={cartItems} onCheckout={onCheckout} />
    </header>
  );
};

export default ShopHeader;
