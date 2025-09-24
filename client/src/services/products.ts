import { z } from "zod";
import { productSchema, type NewProduct } from "../types";

const productsSchema = z.array(productSchema);

export const getAllProducts = async () => {
  const response = await fetch("/api/products");
  const data = await response.json();
  const products = productsSchema.parse(data);
  return products;
};

export const createProduct = async (newProduct: NewProduct) => {
  const response = await fetch("/api/products", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });

  const data = await response.json();
  const product = productSchema.parse(data);
  return product;
};
