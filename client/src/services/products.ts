import { z } from "zod";
import { productSchema } from "../types";

const productsSchema = z.array(productSchema);

export const getAllProducts = async () => {
  try {
    const response = await fetch("/api/products");
    const data = await response.json();
    const products = productsSchema.parse(data);
    return products;
  } catch (error) {
    // TODO: handle zod error
    console.log(error);
  }
};
