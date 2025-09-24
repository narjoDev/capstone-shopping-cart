import type { NewProduct, Product } from "../types";
import EditableProductDetails from "./EditableProductDetails";
import ToggledAddProductForm from "./ToggledAddProductForm";

interface ProductListWithAddProps {
  products: Product[];
  addProduct: (product: NewProduct) => Promise<Product>;
}

const ProductListWithAdd = ({
  products,
  addProduct,
}: ProductListWithAddProps) => {
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
      <ToggledAddProductForm addProduct={addProduct} />
    </>
  );
};

export default ProductListWithAdd;
