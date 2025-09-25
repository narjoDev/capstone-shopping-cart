import { z } from "zod";
import { cartItemSchema, productSchema, type Product } from "../types";

const cartSchema = z.array(cartItemSchema);
const addResponseSchema = z.object({
  product: productSchema.extend({
    error: z.string().optional(),
  }),
  item: cartItemSchema,
});

export const getAllCartItems = async () => {
  const response = await fetch("/api/cart");
  return cartSchema.parse(await response.json());
};

export const checkout = async () => {
  const response = await fetch("/api/checkout", {
    method: "post",
  });
  if (!response.ok) {
    console.log(response);
    throw Error(`Error checking out. Response not ok.`);
  }
};

export const addToCart = async (productId: Product["_id"]) => {
  const response = await fetch("/api/add-to-cart", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const data = addResponseSchema.parse(await response.json());
  if (data.product.error !== undefined) {
    throw Error(`Error adding to cart: ${data.product.error}`);
  } else {
    return data;
  }
};
