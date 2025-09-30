import type { SortConfig } from "../reducers/productSortReducer";

const ARROW_UP = " ↑";
const ARROW_DOWN = " ↓";

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

  const getSortIndicator = (sortField: SortConfig["sortField"]) => {
    if (config.sortField !== sortField) return null;
    return config.isAscending ? ARROW_UP : ARROW_DOWN;
  };

  return (
    <div className="sort-control">
      Sort by:
      <button
        className={`sort-button ${
          config.sortField === "title" ? "active" : ""
        }`}
        onClick={onClickSort("title")}
      >
        Name{getSortIndicator("title")}
      </button>
      <button
        className={`sort-button ${
          config.sortField === "price" ? "active" : ""
        }`}
        onClick={onClickSort("price")}
      >
        Price{getSortIndicator("price")}
      </button>
      <button
        className={`sort-button ${
          config.sortField === "quantity" ? "active" : ""
        }`}
        onClick={onClickSort("quantity")}
      >
        Quantity{getSortIndicator("quantity")}
      </button>
    </div>
  );
};

export default SortControls;
