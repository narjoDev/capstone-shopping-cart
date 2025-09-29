import type { Product } from "../types";
import EditableProductDetails from "./EditableProductDetails";

interface ProductListProps {
  products: Product[];
  editProduct: (
    id: Product["_id"],
    updatedFields: Partial<Omit<Product, "_id">>,
    callback?: () => void
  ) => void;
  deleteProduct: (id: Product["_id"]) => void;
  onAddToCart: (id: Product["_id"]) => void;
}

const ProductList = ({
  products,
  editProduct,
  deleteProduct,
  onAddToCart,
}: ProductListProps) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <EditableProductDetails
            key={product._id}
            product={product}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            onAddToCart={onAddToCart}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
