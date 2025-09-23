import type { Product } from "../types";

interface ProductDetailsProps {
  product: Pick<Product, "title" | "quantity" | "price">;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

// Srdjan says "Product" is not an ideal name
const ProductDetails = ({ product, setShowEdit }: ProductDetailsProps) => {
  return (
    <div className="product-details">
      <h3>{product.title}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="quantity">{product.quantity} left in stock</p>
      <div className="actions product-actions">
        <button className="add-to-cart" disabled={product.quantity === 0}>
          Add to Cart
        </button>
        <button className="edit" onClick={() => setShowEdit(true)}>
          Edit
        </button>
      </div>
      <button className="delete-button">
        <span>X</span>
      </button>
    </div>
  );
};

export default ProductDetails;
