import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export type Product = z.infer<typeof productSchema>;

export const cartItemSchema = productSchema
  .pick({
    title: true,
    quantity: true,
    price: true,
  })
  .extend({
    _id: z.string(),
    productId: productSchema.shape._id,
  });

export type CartItem = z.infer<typeof cartItemSchema>;
