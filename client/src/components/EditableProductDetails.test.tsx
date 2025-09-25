import EditableProductDetails from "./EditableProductDetails";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("hides edit form by default", () => {
  const props = {
    product: { _id: "xxx", title: "FooWidget", quantity: 1, price: 1.23 },
    editProduct: () => {},
    deleteProduct: () => {},
    onAddToCart: () => {},
  };
  render(<EditableProductDetails {...props} />);

  const editHeader = screen.queryByRole("heading", { name: /Edit Product/i });
  expect(editHeader).not.toBeInTheDocument();
});

it("shows edit form when edit button clicked", async () => {
  const props = {
    product: { _id: "xxx", title: "FooWidget", quantity: 1, price: 1.23 },
    editProduct: () => {},
    deleteProduct: () => {},
    onAddToCart: () => {},
  };
  render(<EditableProductDetails {...props} />);
  const user = userEvent.setup();

  const editButton = screen.getByRole("button", { name: /edit/i });
  await user.click(editButton);

  const editHeader = screen.getByRole("heading", { name: /Edit Product/i });
  expect(editHeader).toBeInTheDocument();
});

it("hides edit form when cancel clicked", async () => {
  const props = {
    product: { _id: "xxx", title: "FooWidget", quantity: 1, price: 1.23 },
    editProduct: () => {},
    deleteProduct: () => {},
    onAddToCart: () => {},
  };
  render(<EditableProductDetails {...props} />);
  const user = userEvent.setup();

  const editButton = screen.getByRole("button", { name: /edit/i });
  await user.click(editButton);
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  await user.click(cancelButton);
  expect(cancelButton).not.toBeInTheDocument();
});
