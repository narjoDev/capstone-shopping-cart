import type { Product } from "../types";
import ProductDetails from "./ProductDetails";
import EditProductForm from "./EditProductForm";
import useToggle from "../hooks/useToggle";

interface EditableProductDetailsProps {
  product: Product; //Pick<Product, "title" | "quantity" | "price">;
  editProduct: (
    id: Product["_id"],
    updatedFields: Partial<Omit<Product, "_id">>,
    callback?: () => void
  ) => void;
  deleteProduct: (id: Product["_id"]) => void;
  onAddToCart: (id: Product["_id"]) => void;
}

const EditableProductDetails = ({
  product,
  editProduct,
  deleteProduct,
  onAddToCart,
}: EditableProductDetailsProps) => {
  const [isVisible, toggleVisible] = useToggle(false);
  return (
    <li key={product._id} className="product">
      <ProductDetails
        product={product}
        toggleShowEdit={toggleVisible}
        deleteProduct={deleteProduct}
        onAddToCart={onAddToCart}
      />
      {isVisible && (
        <EditProductForm
          toggleShowForm={toggleVisible}
          product={product}
          editProduct={editProduct}
        />
      )}
    </li>
  );
};

export default EditableProductDetails;
