import { useEffect, useState } from "react";
import ShopHeader from "./components/ShopHeader";
import ProductListWithAdd from "./components/ProductListWithAdd";
import type { CartItem as CartItemType, NewProduct, Product } from "./types";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./services/products";
import { addToCart, checkout, getAllCartItems } from "./services/cart";

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
    (async () => {
      try {
        const fetchedCart: CartItemType[] = await getAllCartItems();
        setCartItems(fetchedCart);
      } catch (error) {
        console.log(error);
      }
    })();
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

  const handleCheckout = async () => {
    await checkout();
    setCartItems([]);
  };

  const handleAddToCart = async (id: Product["_id"]) => {
    const { product: updatedProduct, item: updatedItem } = await addToCart(id);
    setProducts(
      products.map((product) => {
        return product._id === id ? updatedProduct : product;
      })
    );
    if (updatedItem.quantity === 1) {
      setCartItems(cartItems.concat(updatedItem));
    } else {
      setCartItems(
        cartItems.map((item) => {
          return item._id === updatedItem._id ? updatedItem : item;
        })
      );
    }
  };

  return (
    <div id="app">
      <ShopHeader cartItems={cartItems} onCheckout={handleCheckout} />

      <main>
        <ProductListWithAdd
          products={products}
          addProduct={handleAddProduct}
          editProduct={handleEditProduct}
          deleteProduct={handleDeleteProduct}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
};

export default App;
