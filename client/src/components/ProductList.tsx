import { useEffect, useReducer, useState } from "react";
import type { Product } from "../types";
import EditableProductDetails from "./EditableProductDetails";
import SortControls from "./SortControls";
import productSortReducer, {
  type ProductSortConfigAction,
} from "../reducers/productSortReducer";

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
  const [sortState, dispatch] = useReducer(productSortReducer, {
    products,
    config: { sortField: "title", isAscending: false },
  });
  const { products: sortedProducts, config } = sortState;

  // useEffect(() => {
  //   dispatch(sortConfig);
  // }, [sortConfig]);

  useEffect(() => {
    dispatch({ type: "PRODUCT_SORT_OVERWRITE", products });
  }, [products]);

  return (
    <div className="product-listing">
      <h2>Products</h2>
      {/* <SortControls /> */}
      <ul className="product-list">
        {sortedProducts.map((product) => (
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
