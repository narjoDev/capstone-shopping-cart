import type { Product } from "../types";

interface EditProductFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  product: Pick<Product, "title" | "quantity" | "price">;
}

const EditProductForm = ({ setShowForm, product }: EditProductFormProps) => {
  const onCancel = () => {
    setShowForm(false);
    // inputs are destroyed assuming parent unmounts this component
  };

  // FIXME: form inputs are read only; should be controlled
  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={product.title}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={product.price}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={product.quantity}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
