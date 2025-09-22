export interface Product {
  _id: string;
  title: string;
  quantity: number;
  price: number;
}

export interface CartItem
  extends Pick<Product, "title" | "quantity" | "price"> {
  _id: string;
  productId: Product["_id"];
}
