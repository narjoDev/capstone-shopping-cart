import { useContext, useEffect, useReducer } from "react";

import ShopHeader from "./components/ShopHeader";
import ProductList from "./components/ProductList";
import ToggledAddProductForm from "./components/ToggledAddProductForm";

import type { CartItem as CartItemType, NewProduct, Product } from "./types";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./services/products";
import { addToCart, checkout, getAllCartItems } from "./services/cart";

import cartReducer, { CartAction } from "./reducers/cartReducer";
import productsReducer, { ProductsAction } from "./reducers/productsReducer";
import { AppContext } from "./providers/AppProvider";

const App = () => {
  const [cartItems, dispatchCart] = useReducer(cartReducer, []);
  const [products, dispatchProducts] = useReducer(productsReducer, []);
  const { theme } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const fetchedProducts: Product[] = await getAllProducts();
        dispatchProducts(ProductsAction.SetAll(fetchedProducts));
      } catch (error) {
        console.log(error);
      }
    })();
    (async () => {
      try {
        const fetchedCart: CartItemType[] = await getAllCartItems();
        dispatchCart(CartAction.SetAll(fetchedCart));
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
      dispatchProducts(ProductsAction.AddProduct(createdProduct));
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
      dispatchProducts(ProductsAction.UpdateProduct(updatedProduct));
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
      dispatchProducts(ProductsAction.DeleteProduct(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      dispatchCart(CartAction.Checkout());
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
      dispatchProducts(ProductsAction.UpdateProduct(updatedProduct));
      dispatchCart(CartAction.AddItem(updatedItem));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="app" className={theme === "dark" ? "theme-dark" : ""}>
      <ShopHeader cartItems={cartItems} onCheckout={handleCheckout} />

      <main>
        <ProductList
          products={products}
          editProduct={handleEditProduct}
          deleteProduct={handleDeleteProduct}
          onAddToCart={handleAddToCart}
        />
        <ToggledAddProductForm addProduct={handleAddProduct} />
      </main>
    </div>
  );
};

export default App;
