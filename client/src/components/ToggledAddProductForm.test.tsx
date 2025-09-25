import ToggledAddProductForm from "./ToggledAddProductForm";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("displays add product button", () => {
  const props = { addProduct: () => {} };
  render(<ToggledAddProductForm {...props} />);
  const addButton = screen.getByRole("button", { name: /Add A Product/i });
  expect(addButton).toBeInTheDocument();
});

it("hides button and displays form when add button clicked", async () => {
  const props = { addProduct: () => {} };
  render(<ToggledAddProductForm {...props} />);
  const user = userEvent.setup();

  const addButton = screen.getByRole("button", { name: /Add A Product/i });
  await user.click(addButton);
  expect(addButton).not.toBeInTheDocument();

  const nameInput = screen.getByRole("textbox", { name: /Product Name/ });
  expect(nameInput).toBeInTheDocument();
});

it("hides form when cancel clicked", async () => {
  const props = { addProduct: () => {} };
  render(<ToggledAddProductForm {...props} />);
  const user = userEvent.setup();

  const addButton = screen.getByRole("button", { name: /Add A Product/i });
  await user.click(addButton);

  const cancelButton = screen.getByRole("button", { name: /Cancel/ });
  expect(cancelButton).toBeInTheDocument();
  await user.click(cancelButton);

  expect(cancelButton).not.toBeInTheDocument();
  const newAddButton = screen.getByRole("button", { name: /Add A Product/i });
  expect(newAddButton).toBeInTheDocument();
});
