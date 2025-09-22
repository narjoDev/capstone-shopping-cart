import ProductDetails from "./ProductDetails";

const ProductListWithAdd = () => {
  return (
    <>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {[1, 2, 3].map(() => (
            <li className="product">
              <ProductDetails />
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
