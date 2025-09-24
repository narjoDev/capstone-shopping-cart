import { useState, type ChangeEvent } from "react";
import { createProduct } from "../services/products";
import type { NewProduct } from "../types";

interface FormFields {
  title: string;
  price: string;
  quantity: string;
}

interface AddProductFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductForm = ({ setShowForm }: AddProductFormProps) => {
  const [fields, setFields] = useState<FormFields>({
    title: "",
    price: "",
    quantity: "",
  });

  const onCancel = () => {
    setShowForm(false);
    // inputs are destroyed assuming parent unmounts this component
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(fields);

    const convertedFields: NewProduct = {
      ...fields,
      price: parseFloat(fields.price),
      quantity: parseInt(fields.quantity),
    };
    // TODO: gracefully handle failure
    const createdProduct = await createProduct(convertedFields);
    console.log(createdProduct);
    // TODO: add created product to global state
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
