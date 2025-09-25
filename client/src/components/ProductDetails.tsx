import type { Product } from "../types";

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
  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-details">
      <h3>{product.title}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
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
      <button className="delete-button" onClick={handleDelete}>
        <span>X</span>
      </button>
    </div>
  );
};

export default ProductDetails;
