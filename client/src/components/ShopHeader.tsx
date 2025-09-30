import { useContext } from "react";
import type { CartItem as CartItemType } from "../types";
import Cart from "./Cart";
import { AppContext } from "../providers/AppProvider";

interface ShopHeaderProps {
  cartItems: CartItemType[];
  onCheckout: () => void;
}

const ShopHeader = ({ cartItems, onCheckout }: ShopHeaderProps) => {
  const { theme, handleThemeChange, currency, handleCurrencyChange } =
    useContext(AppContext);
  const otherTheme = theme === "light" ? "dark" : "light";
  const otherCurrency = currency === "USD" ? "EUR" : "USD";

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
        <button onClick={() => handleCurrencyChange(otherCurrency)}>
          {currency}
        </button>
      </div>
      <Cart items={cartItems} onCheckout={onCheckout} />
    </header>
  );
};

export default ShopHeader;
