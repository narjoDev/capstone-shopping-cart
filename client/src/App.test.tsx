import App from "./App";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as productService from "./services/products";
import * as cartService from "./services/cart";
import type { CartItem, Product } from "./types";

vi.mock("./services/products.ts");
vi.mock("./services/cart.ts");
const mockedProductService = vi.mocked(productService);
const mockedCartService = vi.mocked(cartService);

beforeEach(vi.resetAllMocks);

it("displays a product if exists", async () => {
  const mockedAllProducts: Product[] = [
    {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
    },
  ];

  mockedProductService.getAllProducts.mockResolvedValue(mockedAllProducts);
  mockedCartService.getAllCartItems.mockResolvedValue([]);
  render(<App />);

  const title = await screen.findByRole("heading", {
    name: "Amazon Kindle E-reader",
  });
  expect(title).toBeInTheDocument();
});

it("displays message for empty cart", async () => {
  mockedProductService.getAllProducts.mockResolvedValue([]);
  mockedCartService.getAllCartItems.mockResolvedValue([]);

  render(<App />);

  const cartHeading = await screen.findByRole("heading", { name: /Your Cart/ });
  expect(cartHeading).toBeInTheDocument();

  const emptyMessage = screen.getByText(/cart is empty/i);
  expect(emptyMessage).toBeInTheDocument();
});

it("displays cart headings and items", async () => {
  const mockCartItem: CartItem = {
    _id: "a1",
    productId: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
  };

  mockedProductService.getAllProducts.mockResolvedValue([]);
  mockedCartService.getAllCartItems.mockResolvedValue([mockCartItem]);

  render(<App />);

  const priceHeading = await screen.findByRole("columnheader", {
    name: /quantity/i,
  });
  expect(priceHeading).toBeInTheDocument();

  const priceCell = await screen.findByRole("cell", {
    name: `$${mockCartItem.price}`,
  });
  expect(priceCell).toBeInTheDocument();
});

it("when product is added: it appears in list, form disappears", async () => {
  const mockedProduct: Product = {
    _id: "xxx",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  };
  const user = userEvent.setup();

  // load app
  mockedProductService.getAllProducts.mockResolvedValue([]);
  mockedCartService.getAllCartItems.mockResolvedValue([]);

  render(<App />);

  // show form
  const addButton = await screen.findByRole("button", {
    name: /Add A Product/i,
  });
  await user.click(addButton);

  // fill form
  const titleInput = screen.getByRole("textbox", { name: /Product Name/ });
  await user.type(titleInput, mockedProduct.title);

  const priceInput = screen.getByRole("spinbutton", { name: /Price/ });
  await user.type(priceInput, mockedProduct.price.toString());

  const quantityInput = screen.getByRole("spinbutton", { name: /Quantity/ });
  await user.type(quantityInput, mockedProduct.quantity.toString());

  // submit form
  const submitButton = screen.getByRole("button", { name: "Add" });
  mockedProductService.createProduct.mockResolvedValue(mockedProduct);
  await user.click(submitButton);

  // assert product appears
  const title = await screen.findByRole("heading", {
    name: "Amazon Kindle E-reader",
  });
  expect(title).toBeInTheDocument();

  // assert form disappears
  expect(titleInput).not.toBeInTheDocument();
  expect(priceInput).not.toBeInTheDocument();
  expect(quantityInput).not.toBeInTheDocument();
  expect(submitButton).not.toBeInTheDocument();
});

it("product delete button exists and removes product", async () => {
  const mockedAllProducts: Product[] = [
    {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
    },
  ];

  mockedProductService.getAllProducts.mockResolvedValue(mockedAllProducts);
  mockedCartService.getAllCartItems.mockResolvedValue([]);
  render(<App />);
  const user = userEvent.setup();

  const title = await screen.findByRole("heading", {
    name: "Amazon Kindle E-reader",
  });
  expect(title).toBeInTheDocument();

  const deleteButton = await screen.findByRole("button", {
    name: /x/i,
  });
  expect(deleteButton).toBeInTheDocument();

  await user.click(deleteButton);
  expect(deleteButton).not.toBeInTheDocument();
});

it("add to cart makes product appear in cart; reduces quantity", async () => {
  const mockedProduct: Product = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  };
  const mockCartItem: CartItem = {
    _id: "a1",
    productId: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
  };

  mockedProductService.getAllProducts.mockResolvedValue([mockedProduct]);
  mockedCartService.getAllCartItems.mockResolvedValue([]);
  render(<App />);
  const user = userEvent.setup();

  const addToCartButton = await screen.findByRole("button", {
    name: /add to cart/i,
  });
  expect(addToCartButton).toBeInTheDocument();

  // mockedCartService.getAllCartItems.mockResolvedValue([mockCartItem]);
  mockedCartService.addToCart.mockResolvedValue({
    product: { ...mockedProduct, quantity: 4 },
    item: mockCartItem,
  });
  await user.click(addToCartButton);

  // cart matches product
  const priceCell = await screen.findByRole("cell", {
    name: `$${mockedProduct.price}`,
  });
  expect(priceCell).toBeInTheDocument();

  // initial quantity is 1
  const quantityCell = await screen.findByRole("cell", {
    name: "1",
  });
  expect(quantityCell).toBeInTheDocument();

  // reduces quantity left
  const quantityLeft = await screen.findByText(
    `${mockedProduct.quantity - 1} left in stock`
  );
  expect(quantityLeft).toBeInTheDocument();
});

it("checkout removes item and shows empty message", async () => {
  const mockCartItem: CartItem = {
    _id: "a1",
    productId: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
  };

  mockedProductService.getAllProducts.mockResolvedValue([]);
  mockedCartService.getAllCartItems.mockResolvedValue([mockCartItem]);
  render(<App />);
  const user = userEvent.setup();

  const priceCell = await screen.findByRole("cell", {
    name: `$${mockCartItem.price}`,
  });
  expect(priceCell).toBeInTheDocument();

  const checkoutButton = await screen.findByRole("button", {
    name: /checkout/i,
  });
  expect(checkoutButton).toBeInTheDocument();
  expect(checkoutButton).not.toBeDisabled();

  mockedCartService.checkout.mockResolvedValue();
  await user.click(checkoutButton);

  expect(priceCell).not.toBeInTheDocument();
  expect(checkoutButton).toBeDisabled();
  const emptyMessage = screen.getByText(/cart is empty/i);
  expect(emptyMessage).toBeInTheDocument();
});

it("clicking edit shows edit form", async () => {
  const mockedProduct: Product = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  };

  mockedProductService.getAllProducts.mockResolvedValue([mockedProduct]);
  mockedCartService.getAllCartItems.mockResolvedValue([]);
  render(<App />);
  const user = userEvent.setup();

  const editButton = await screen.findByRole("button", {
    name: /Edit/i,
  });
  expect(editButton).toBeInTheDocument();

  await user.click(editButton);

  const editHeading = await screen.findByRole("heading", {
    name: "Edit Product",
  });
  expect(editHeading).toBeInTheDocument();
});

it("clicking cancel hides edit form", async () => {
  const mockedProduct: Product = {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  };

  mockedProductService.getAllProducts.mockResolvedValue([mockedProduct]);
  mockedCartService.getAllCartItems.mockResolvedValue([]);
  render(<App />);
  const user = userEvent.setup();

  const editButton = await screen.findByRole("button", {
    name: "Edit",
  });
  expect(editButton).toBeInTheDocument();

  await user.click(editButton);

  const cancelButton = await screen.findByRole("button", {
    name: "Cancel",
  });
  expect(cancelButton).toBeInTheDocument();

  await user.click(cancelButton);

  expect(editButton).toBeInTheDocument();
  expect(cancelButton).not.toBeInTheDocument();
});
