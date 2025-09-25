import { useState, type ChangeEvent } from "react";
import type { NewProduct } from "../types";

interface FormFields {
  title: string;
  price: string;
  quantity: string;
}

const EMPTY_FIELDS: FormFields = {
  title: "",
  price: "",
  quantity: "",
};

interface AddProductFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: (product: NewProduct, callback?: () => void) => void;
}

// solution uses common ProductForm component for both add and edit
// note that this makes fields in the edit form required
const AddProductForm = ({ setShowForm, addProduct }: AddProductFormProps) => {
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);

  const onCancel = () => {
    setShowForm(false);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const convertedFields: NewProduct = {
      ...fields,
      price: parseFloat(fields.price),
      quantity: parseInt(fields.quantity),
    };

    await addProduct(convertedFields, () => setFields(EMPTY_FIELDS));
  };

  const makeSetter = (field: keyof FormFields) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const newFields = { ...fields };
      newFields[field] = event.target.value;
      setFields(newFields);
    };
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="product-name"
            required
            value={fields.title}
            onChange={makeSetter("title")}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min="0"
            step="0.01"
            required
            value={fields.price}
            onChange={makeSetter("price")}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min="0"
            required
            value={fields.quantity}
            onChange={makeSetter("quantity")}
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
