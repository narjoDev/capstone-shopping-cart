import type { NewProduct, Product } from "../types";
import EditableProductDetails from "./EditableProductDetails";
import ToggledAddProductForm from "./ToggledAddProductForm";

interface ProductListWithAddProps {
  products: Product[];
  addProduct: (product: NewProduct) => Promise<Product>;
  editProduct: (
    id: Product["_id"],
    updatedFields: Partial<Omit<Product, "_id">>
  ) => Promise<Product>;
  deleteProduct: (id: Product["_id"]) => void;
  onAddToCart: (id: Product["_id"]) => void;
}

const ProductListWithAdd = ({
  products,
  addProduct,
  editProduct,
  deleteProduct,
  onAddToCart,
}: ProductListWithAddProps) => {
  return (
    <>
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
      <ToggledAddProductForm addProduct={addProduct} />
    </>
  );
};

export default ProductListWithAdd;
