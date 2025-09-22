import Cart from "./components/Cart";
import ProductListWithAdd from "./components/ProductListWithAdd";

const App = () => {
  return (
    <div id="app">
      {/* TODO: should header be a component? */}
      <header>
        <h1>The Shop!</h1>
        <Cart />
      </header>

      <main>
        <ProductListWithAdd />
      </main>
    </div>
  );
};

export default App;
