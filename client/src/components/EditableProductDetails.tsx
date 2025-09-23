import { useState } from "react";
import type { Product } from "../types";
import ProductDetails from "./ProductDetails";
import EditProductForm from "./EditProductForm";

interface EditableProductDetailsProps {
  product: Product; //Pick<Product, "title" | "quantity" | "price">;
}

const EditableProductDetails = ({ product }: EditableProductDetailsProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { title, quantity, price } = product;
  const detailsProductProps = { title, quantity, price };
  return (
    <li key={product._id} className="product">
      <ProductDetails
        product={detailsProductProps}
        setShowEdit={setShowEditForm}
      />
      {showEditForm && (
        <EditProductForm setShowForm={setShowEditForm} product={product} />
      )}
    </li>
  );
};

export default EditableProductDetails;
