import { useEffect, useState } from "react";
import ShopHeader from "./components/ShopHeader";
import ProductListWithAdd from "./components/ProductListWithAdd";
import type { CartItem as CartItemType, NewProduct, Product } from "./types";

import { mockCart } from "./lib/mockData/data";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./services/products";

const App = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedProducts: Product[] = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    })();
    setCartItems(mockCart);
  }, []);

  const handleAddProduct = async (product: NewProduct) => {
    const createdProduct = await createProduct(product);
    setProducts(products.concat(createdProduct));
    return createdProduct;
  };

  const handleEditProduct = async (
    id: Product["_id"],
    updatedFields: Partial<Omit<Product, "_id">>
  ) => {
    const updatedProduct = await updateProduct(id, updatedFields);
    setProducts(
      products.map((product) => {
        return product._id === id ? updatedProduct : product;
      })
    );
    return updatedProduct;
  };

  const handleDeleteProduct = async (id: Product["_id"]) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div id="app">
      <ShopHeader cartItems={cartItems} />

      <main>
        <ProductListWithAdd
          products={products}
          addProduct={handleAddProduct}
          editProduct={handleEditProduct}
          deleteProduct={handleDeleteProduct}
        />
      </main>
    </div>
  );
};

export default App;
