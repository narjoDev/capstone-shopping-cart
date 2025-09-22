import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import ProductListWithAdd from "./components/ProductListWithAdd";
import type { CartItem as CartItemType, Product } from "./types";

import { mockProducts, mockCart } from "./lib/mockData/data";

const App = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(mockCart);
    setProducts(mockProducts);
  }, []);

  return (
    <div id="app">
      {/* TODO: should header be a component? */}
      <header>
        <h1>The Shop!</h1>
        <Cart items={cartItems} />
      </header>

      <main>
        <ProductListWithAdd products={products} />
      </main>
    </div>
  );
};

export default App;
