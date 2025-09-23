import { useState } from "react";
import type { Product } from "../types";
import AddProductForm from "./AddProductForm";
import EditableProductDetails from "./EditableProductDetails";

interface ProductListWithAddProps {
  products: Product[];
}

const ProductListWithAdd = ({ products }: ProductListWithAddProps) => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {products.map((product) => (
            <EditableProductDetails product={product} />
          ))}
        </ul>
      </div>
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

export default ProductListWithAdd;
