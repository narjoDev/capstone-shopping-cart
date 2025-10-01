import type { NewProduct } from "../types";
import { useForm } from "react-hook-form";

interface FormFields {
  title: string;
  price: string;
  quantity: string;
}

interface AddProductFormProps {
  toggleVisible: () => void;
  addProduct: (product: NewProduct, callback?: () => void) => void;
}

const AddProductForm = ({ toggleVisible, addProduct }: AddProductFormProps) => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit = handleSubmit((fields) => {
    const convertedFields: NewProduct = {
      ...fields,
      price: parseFloat(fields.price),
      quantity: parseInt(fields.quantity),
    };
    addProduct(convertedFields, toggleVisible);
  });

  return (
    <div className="add-form">
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            {...register("title", { required: true })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            min="0"
            step="0.01"
            {...register("price", { required: true })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            min="0"
            {...register("quantity", { required: true })}
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={toggleVisible}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
