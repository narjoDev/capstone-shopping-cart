import { useState, type ChangeEvent } from "react";
import type { NewProduct, Product } from "../types";

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

interface EditProductFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
  editProduct: (
    id: Product["_id"],
    updatedFields: Partial<Omit<Product, "_id">>,
    callback?: () => void
  ) => void;
}

const EditProductForm = ({
  setShowForm,
  product,
  editProduct,
}: EditProductFormProps) => {
  const [fields, setFields] = useState<FormFields>(EMPTY_FIELDS);

  const onCancel = () => {
    setShowForm(false);
    // inputs are destroyed assuming parent unmounts this component
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const optionalFields: Partial<NewProduct> = {};

    if (fields.title) {
      optionalFields.title = fields.title;
    }
    if (fields.price) {
      optionalFields.price = parseFloat(fields.price);
    }
    if (fields.quantity) {
      optionalFields.quantity = parseInt(fields.quantity);
    }

    await editProduct(product._id, optionalFields, () => setShowForm(false));
  };

  const makeSetter = (field: keyof FormFields) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const newFields = { ...fields };
      newFields[field] = event.target.value;
      setFields(newFields);
    };
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={fields.title}
            onChange={makeSetter("title")}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={fields.price}
            onChange={makeSetter("price")}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={fields.quantity}
            onChange={makeSetter("quantity")}
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
