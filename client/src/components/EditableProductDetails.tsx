import { useState } from "react";
import type { Product } from "../types";
import ProductDetails from "./ProductDetails";
import EditProductForm from "./EditProductForm";

interface EditableProductDetailsProps {
  product: Product; //Pick<Product, "title" | "quantity" | "price">;
  editProduct: (
    id: Product["_id"],
    updatedFields: Partial<Omit<Product, "_id">>
  ) => Promise<Product>;
  deleteProduct: (id: Product["_id"]) => void;
  onAddToCart: (id: Product["_id"]) => void;
}

const EditableProductDetails = ({
  product,
  editProduct,
  deleteProduct,
  onAddToCart,
}: EditableProductDetailsProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  return (
    <li key={product._id} className="product">
      <ProductDetails
        product={product}
        setShowEdit={setShowEditForm}
        deleteProduct={deleteProduct}
        onAddToCart={onAddToCart}
      />
      {showEditForm && (
        <EditProductForm
          setShowForm={setShowEditForm}
          product={product}
          editProduct={editProduct}
        />
      )}
    </li>
  );
};

export default EditableProductDetails;
