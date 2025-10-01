import { useContext } from "react";
import { AppContext } from "../providers/AppProvider";
import type { Product } from "../types";
import { ExchangeRateContext } from "../providers/ExchangeRateProvider";

interface ProductDetailsProps {
  product: Product;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  deleteProduct: (id: Product["_id"]) => void;
  onAddToCart: (id: Product["_id"]) => void;
}

// Srdjan says "Product" is not an ideal name
const ProductDetails = ({
  product,
  setShowEdit,
  deleteProduct,
  onAddToCart,
}: ProductDetailsProps) => {
  const { currency } = useContext(AppContext);
  const currencySymbol = currency === "USD" ? "$" : "€";
  const { rates } = useContext(ExchangeRateContext);
  const rate = rates[currency];

  return (
    <div className="product-details">
      <h3>{product.title}</h3>
      <p className="price">
        {currencySymbol}
        {(product.price * rate).toFixed(2)}
      </p>
      <p className="quantity">{product.quantity} left in stock</p>
      <div className="actions product-actions">
        <button
          className="add-to-cart"
          disabled={product.quantity === 0}
          onClick={() => onAddToCart(product._id)}
        >
          Add to Cart
        </button>
        <button className="edit" onClick={() => setShowEdit(true)}>
          Edit
        </button>
      </div>
      <button
        className="delete-button"
        onClick={() => deleteProduct(product._id)}
      >
        <span>X</span>
      </button>
    </div>
  );
};

export default ProductDetails;
