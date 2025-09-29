import type { SortConfig } from "../reducers/productSortReducer";

const ARROW_UP = "↑";
const ARROW_DOWN = "↓";

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
      <button onClick={onClickSort("title")}>Name</button>
      <button onClick={onClickSort("price")}>Price</button>
      <button onClick={onClickSort("quantity")}>Quantity</button>
    </div>
  );
};

export default SortControls;
