// TODO: Srdjan says "Product" is not an ideal name
const ProductDetails = () => {
  return (
    <div className="product-details">
      <h3>Amazon Kindle E-reader</h3>
      <p className="price">$79.99</p>
      <p className="quantity">5 left in stock</p>
      <div className="actions product-actions">
        {/* TODO: add to cart can be disabled (based on in stock?) */}
        <button className="add-to-cart">Add to Cart</button>
        <button className="edit">Edit</button>
      </div>
      <button className="delete-button">
        <span>X</span>
      </button>
    </div>
  );
};

export default ProductDetails;
