import { useEffect, useState } from "react";
import ShopHeader from "./components/ShopHeader";
import ProductListWithAdd from "./components/ProductListWithAdd";
import type { CartItem as CartItemType, Product } from "./types";

import { mockCart } from "./lib/mockData/data";
import { getAllProducts } from "./services/products";

const App = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedProducts: Product[] | undefined = await getAllProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      }
    })();
    setCartItems(mockCart);
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
