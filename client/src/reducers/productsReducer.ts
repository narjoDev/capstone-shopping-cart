import type { Product } from "../types";

interface ProductsAddProductAction {
  type: "PRODUCTS_ADD_PRODUCT";
  payload: Product;
}

interface ProductsUpdateProductAction {
  type: "PRODUCTS_UPDATE_PRODUCT";
  payload: Product;
}

interface ProductsDeleteProductAction {
  type: "PRODUCTS_DELETE_PRODUCT";
  payload: Product["_id"];
}

interface ProductsSetAllAction {
  type: "PRODUCTS_SET_ALL";
  payload: Product[];
}

type ProductsAction =
  | ProductsAddProductAction
  | ProductsUpdateProductAction
  | ProductsDeleteProductAction
  | ProductsSetAllAction;

export const ProductsAction = {
  AddProduct: (payload: Product): ProductsAddProductAction => ({
    type: "PRODUCTS_ADD_PRODUCT",
    payload,
  }),
  UpdateProduct: (payload: Product): ProductsUpdateProductAction => ({
    type: "PRODUCTS_UPDATE_PRODUCT",
    payload,
  }),
  DeleteProduct: (payload: Product["_id"]): ProductsDeleteProductAction => ({
    type: "PRODUCTS_DELETE_PRODUCT",
    payload,
  }),
  SetAll: (payload: Product[]): ProductsSetAllAction => ({
    type: "PRODUCTS_SET_ALL",
    payload,
  }),
};

const productsReducer = (
  previousProducts: Product[],
  action: ProductsAction
): Product[] => {
  const { type } = action;
  switch (type) {
    case "PRODUCTS_ADD_PRODUCT": {
      return previousProducts.concat(action.payload);
    }
    case "PRODUCTS_UPDATE_PRODUCT": {
      const updatedProduct = action.payload;
      return previousProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    }
    case "PRODUCTS_DELETE_PRODUCT": {
      return previousProducts.filter(
        (product) => product._id !== action.payload
      );
    }
    case "PRODUCTS_SET_ALL": {
      return action.payload;
    }
    default: {
      const t: never = type;
      throw Error(`Unexpected action type: ${t}`);
    }
  }
};

export default productsReducer;
