import type { NewProduct, Product } from "../types";
import { useForm } from "react-hook-form";

interface FormFields {
  title: string;
  price: string;
  quantity: string;
}

interface EditProductFormProps {
  toggleShowForm: () => void;
  product: Product;
  editProduct: (
    id: Product["_id"],
    updatedFields: Partial<Omit<Product, "_id">>,
    callback?: () => void
  ) => void;
}

const EditProductForm = ({
  toggleShowForm,
  product,
  editProduct,
}: EditProductFormProps) => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit = async (fields: Partial<FormFields>) => {
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

    // TODO: Handle empty form more gracefully
    if (Object.keys(optionalFields).length === 0) {
      return;
    }

    await editProduct(product._id, optionalFields, toggleShowForm);
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            aria-label="Product Name"
            {...register("title")}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            aria-label="Product Price"
            step="0.01"
            min="0"
            {...register("price")}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            aria-label="Product Quantity"
            min="0"
            {...register("quantity")}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={toggleShowForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
