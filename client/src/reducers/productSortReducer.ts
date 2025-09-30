import type { Product } from "../types";

interface ProductSortOverwriteAction {
  type: "PRODUCT_SORT_OVERWRITE";
  products: Product[];
}

export interface SortConfig {
  sortField: keyof Pick<Product, "title" | "price" | "quantity">;
  isAscending: boolean;
}

interface ProductSortConfigAction {
  type: "PRODUCT_SORT_CONFIG";
  config: SortConfig;
}

export type ProductSortAction =
  | ProductSortOverwriteAction
  | ProductSortConfigAction;

// TODO: export actions

interface SortState {
  products: Product[];
  config: SortConfig;
}

const productSortReducer = (
  previousState: SortState,
  action: ProductSortAction
): SortState => {
  const { type } = action;
  let { products, config } = previousState;

  switch (type) {
    case "PRODUCT_SORT_OVERWRITE": {
      products = action.products;
      break;
    }
    case "PRODUCT_SORT_CONFIG": {
      config = action.config;
      break;
    }
    default: {
      const t: never = type;
      throw Error(`Unexpected action type: ${t}`);
    }
  }

  return {
    products: sortByConfig(products, config),
    config,
  };
};

export default productSortReducer;

function sortByConfig(
  products: Product[],
  { sortField, isAscending }: SortConfig
) {
  return products.toSorted((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue === bValue) {
      return 0;
    } else {
      const isABefore = isAscending ? aValue < bValue : bValue < aValue;
      return isABefore ? -1 : 1;
    }
  });
}
