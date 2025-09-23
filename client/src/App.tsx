import { useEffect, useState } from "react";
import ShopHeader from "./components/ShopHeader";
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
      <ShopHeader cartItems={cartItems} />

      <main>
        <ProductListWithAdd products={products} />
      </main>
    </div>
  );
};

export default App;
