import { z } from "zod";
import { productSchema, type NewProduct, type Product } from "../types";

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

  const createdProduct = productSchema.parse(await response.json());
  return createdProduct;
};

export const updateProduct = async (
  id: Product["_id"],
  updatedFields: Partial<Omit<Product, "_id">>
) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });

  const updatedProduct: Product = productSchema.parse(await response.json());
  return updatedProduct;
};

// TODO: hook this up to components
export const deleteProduct = async (id: Product["_id"]) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "delete",
  });
  console.log(response);
};
