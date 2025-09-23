import type { Product } from "../types";
import EditableProductDetails from "./EditableProductDetails";
import ToggledAddProductForm from "./ToggledAddProductForm";

interface ProductListWithAddProps {
  products: Product[];
}

const ProductListWithAdd = ({ products }: ProductListWithAddProps) => {
  return (
    <>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {products.map((product) => (
            <EditableProductDetails key={product._id} product={product} />
          ))}
        </ul>
      </div>
      <ToggledAddProductForm />
    </>
  );
};

export default ProductListWithAdd;
