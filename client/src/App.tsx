import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import ProductListWithAdd from "./components/ProductListWithAdd";
import type { CartItem as CartItemType } from "./types";

// dummy data
import { mockProducts, mockCart } from "./lib/mockData/data";

const App = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  useEffect(() => {
    setCartItems(mockCart);
  }, []);
  return (
    <div id="app">
      {/* TODO: should header be a component? */}
      <header>
        <h1>The Shop!</h1>
        <Cart items={cartItems} />
      </header>

      <main>
        <ProductListWithAdd />
      </main>
    </div>
  );
};

export default App;
