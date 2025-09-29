import type { CartItem } from "../types";

interface CartAddItemAction {
  type: "CART_ADD_ITEM";
  payload: CartItem;
}

interface CartCheckoutAction {
  type: "CART_CHECKOUT";
}

interface CartSetAllAction {
  type: "CART_SET_ALL";
  payload: CartItem[];
}

type CartAction = CartAddItemAction | CartCheckoutAction | CartSetAllAction;

export const CartAction = {
  AddItem: (payload: CartItem): CartAddItemAction => ({
    type: "CART_ADD_ITEM",
    payload,
  }),
  Checkout: (): CartCheckoutAction => ({ type: "CART_CHECKOUT" }),
  SetAll: (payload: CartItem[]): CartSetAllAction => ({
    type: "CART_SET_ALL",
    payload,
  }),
};

const cartReducer = (
  previousCartItems: CartItem[],
  action: CartAction
): CartItem[] => {
  const { type } = action;
  switch (type) {
    case "CART_ADD_ITEM": {
      const addedItem = action.payload;

      const isAlreadyInCart: boolean = previousCartItems.some(
        (item) => item._id === addedItem._id
      );

      if (isAlreadyInCart) {
        return previousCartItems.map((item) => {
          return item._id === addedItem._id ? addedItem : item;
        });
      } else {
        return previousCartItems.concat(addedItem);
      }
    }
    case "CART_CHECKOUT": {
      return [];
    }
    case "CART_SET_ALL": {
      return action.payload;
    }
    default: {
      const t: never = type;
      throw Error(`Unexpected action type: ${t}`);
    }
  }
};

export default cartReducer;
