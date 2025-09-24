import { useState } from "react";
import AddProductForm from "./AddProductForm";
import type { NewProduct, Product } from "../types";

interface ToggledAddProductFormProps {
  addProduct: (product: NewProduct) => Promise<Product>;
}

const ToggledAddProductForm = ({ addProduct }: ToggledAddProductFormProps) => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <>
      {showAddProduct ? (
        <AddProductForm
          setShowForm={setShowAddProduct}
          addProduct={addProduct}
        />
      ) : (
        <p>
          <button
            className="add-product-button"
            onClick={() => setShowAddProduct(true)}
          >
            Add A Product
          </button>
        </p>
      )}
    </>
  );
};

export default ToggledAddProductForm;
