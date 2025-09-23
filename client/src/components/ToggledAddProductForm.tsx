import { useState } from "react";
import AddProductForm from "./AddProductForm";

const ToggledAddProductForm = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <>
      {showAddProduct ? (
        <AddProductForm setShowForm={setShowAddProduct} />
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
