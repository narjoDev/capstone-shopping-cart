import type { Product } from "../types";

type ProductDetailsProps = Pick<Product, "title" | "quantity" | "price">;

// Srdjan says "Product" is not an ideal name
const ProductDetails = ({ title, price, quantity }: ProductDetailsProps) => {
  return (
    <div className="product-details">
      <h3>{title}</h3>
      <p className="price">${price.toFixed(2)}</p>
      <p className="quantity">{quantity} left in stock</p>
      <div className="actions product-actions">
        <button className="add-to-cart" disabled={quantity === 0}>
          Add to Cart
        </button>
        <button className="edit">Edit</button>
      </div>
      <button className="delete-button">
        <span>X</span>
      </button>
    </div>
  );
};

export default ProductDetails;
