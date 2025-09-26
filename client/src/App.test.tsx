import App from "./App";

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as productService from "./services/products";
import * as cartService from "./services/cart";
import type { Product } from "./types";

vi.mock("./services/products.ts");
vi.mock("./services/cart.ts");
const mockedProductService = vi.mocked(productService);
const mockedCartService = vi.mocked(cartService);

beforeEach(() => {
  vi.resetAllMocks();
});

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

it("when product is added, it appears in list", async () => {
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

  // FIXME:
  // An update to App inside a test was not wrapped in act(...)
  // act(() => render(<App />));
  render(<App />);
  // return;

  // show form
  const addButton = await screen.getByRole("button", {
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
});
