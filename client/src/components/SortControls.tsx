import type { SortConfig } from "../reducers/productSortReducer";

const ARROW_UP = "↑";
const ARROW_DOWN = "↓";

interface SortButtonProps {
  onClick: (event: React.SyntheticEvent) => void;
  text: string;
  // FIXME: stop using this for both isActive and isAscending
  isAscending: boolean | null;
}

const SortButton = ({ onClick, text, isAscending }: SortButtonProps) => {
  const arrow = isAscending ? ARROW_UP : ARROW_DOWN;
  // TODO: put styles in style sheet
  const style =
    isAscending === null
      ? {
          background: "transparent",
          color: "#07575b",
          borderColor: "#07575b",
        }
      : {};
  return (
    <button onClick={onClick} style={{ ...style, borderWidth: "1px" }}>
      {text}
      {isAscending !== null && arrow}
    </button>
  );
};

interface SortControlsProps {
  config: SortConfig;
  onConfigChange: (config: SortConfig) => void;
}

const SortControls = ({ config, onConfigChange }: SortControlsProps) => {
  const onClickSort = (sortField: SortConfig["sortField"]) => {
    return (event: React.SyntheticEvent) => {
      event.preventDefault();

      const isAscending = config.sortField !== sortField || !config.isAscending;

      onConfigChange({
        sortField,
        isAscending,
      });
    };
  };

  return (
    <div>
      Sort by:
      {/* TODO: this is a bit of a mess */}
      <SortButton
        onClick={onClickSort("title")}
        text={"Name"}
        isAscending={config.sortField === "title" ? config.isAscending : null}
      />
      <SortButton
        onClick={onClickSort("price")}
        text={"Price"}
        isAscending={config.sortField === "price" ? config.isAscending : null}
      />
      <SortButton
        onClick={onClickSort("quantity")}
        text={"Quantity"}
        isAscending={
          config.sortField === "quantity" ? config.isAscending : null
        }
      />
    </div>
  );
};

export default SortControls;
