import { useEffect, useReducer, useState } from "react";

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

import cartReducer, { CartAction } from "./reducers/cartReducer";

const App = () => {
  // const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [cartItems, cartDispatch] = useReducer(cartReducer, []);
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
        cartDispatch(CartAction.SetAll(fetchedCart));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleAddProduct = async (
    product: NewProduct,
    callback?: () => void
  ) => {
    try {
      const createdProduct = await createProduct(product);
      setProducts((prevProducts) => prevProducts.concat(createdProduct));
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = async (
    id: Product["_id"],
    updatedFields: Partial<Omit<Product, "_id">>,
    callback?: () => void
  ) => {
    try {
      const updatedProduct = await updateProduct(id, updatedFields);
      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          return product._id === id ? updatedProduct : product;
        });
      });
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FIXME: does not delete matching cart items (optional?)
  const handleDeleteProduct = async (id: Product["_id"]) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) => {
        return prevProducts.filter((p) => p._id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      cartDispatch(CartAction.Checkout());
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (id: Product["_id"]) => {
    const productMatch: Product | undefined = products.find(
      (product) => product._id === id
    );

    if (!productMatch) {
      console.log("Error: Product not found");
      return;
    } else if (productMatch.quantity === 0) {
      console.log("Error: Product has quantity 0");
      return;
    }

    // exists and quantity not zero
    try {
      const { product: updatedProduct, item: updatedItem } = await addToCart(
        id
      );
      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          return product._id === id ? updatedProduct : product;
        });
      });
      cartDispatch(CartAction.AddItem(updatedItem));
    } catch (error) {
      console.log(error);
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
