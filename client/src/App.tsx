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
    // TODO: consider combining these into a single try block
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

  // TODO: Consider: solution catches and logs errors in these handlers

  const handleAddProduct = async (product: NewProduct) => {
    const createdProduct = await createProduct(product);
    // FIXME: use previous state
    setProducts(products.concat(createdProduct));
    return createdProduct;
  };

  const handleEditProduct = async (
    id: Product["_id"],
    updatedFields: Partial<Omit<Product, "_id">>
  ) => {
    const updatedProduct = await updateProduct(id, updatedFields);
    // FIXME: use previous state
    setProducts(
      products.map((product) => {
        return product._id === id ? updatedProduct : product;
      })
    );
    return updatedProduct;
  };

  const handleDeleteProduct = async (id: Product["_id"]) => {
    await deleteProduct(id);
    // FIXME: use previous state
    setProducts(products.filter((p) => p._id !== id));
  };

  const handleCheckout = async () => {
    await checkout();
    // FIXME: use previous state
    setCartItems([]);
  };

  const handleAddToCart = async (id: Product["_id"]) => {
    const { product: updatedProduct, item: updatedItem } = await addToCart(id);
    // FIXME: use previous state
    setProducts(
      products.map((product) => {
        return product._id === id ? updatedProduct : product;
      })
    );
    if (updatedItem.quantity === 1) {
      // FIXME: use previous state
      setCartItems(cartItems.concat(updatedItem));
    } else {
      // FIXME: use previous state
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
        {/* TODO: extract toggled add form */}
      </main>
    </div>
  );
};

export default App;
