import type { Product } from "../types";
import ProductDetails from "./ProductDetails";

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
            <li className="product">
              <ProductDetails
                title={product.title}
                quantity={product.quantity}
                price={product.price}
              />
            </li>
          ))}
        </ul>
      </div>
      <p>
        <button className="add-product-button">Add A Product</button>
      </p>
    </>
  );
};

export default ProductListWithAdd;
