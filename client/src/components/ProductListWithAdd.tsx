import { useState } from "react";
import type { Product } from "../types";
import ProductDetails from "./ProductDetails";
import AddProductForm from "./AddProductForm";

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
            <li key={product._id} className="product">
              <ProductDetails
                title={product.title}
                quantity={product.quantity}
                price={product.price}
              />
            </li>
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
