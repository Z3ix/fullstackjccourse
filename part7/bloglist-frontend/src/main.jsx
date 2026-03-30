import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </BrowserRouter>,
);
