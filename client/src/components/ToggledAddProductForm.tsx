import AddProductForm from "./AddProductForm";
import type { NewProduct } from "../types";
import useToggle from "../hooks/useToggle";

interface ToggledAddProductFormProps {
  addProduct: (product: NewProduct, callback?: () => void) => void;
}

const ToggledAddProductForm = ({ addProduct }: ToggledAddProductFormProps) => {
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <>
      {isVisible ? (
        <AddProductForm toggleVisible={toggleVisible} addProduct={addProduct} />
      ) : (
        <p>
          <button className="add-product-button" onClick={toggleVisible}>
            Add A Product
          </button>
        </p>
      )}
    </>
  );
};

export default ToggledAddProductForm;
