import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from './store'
import { Provider as StoreProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
<QueryClientProvider client ={client}>
    <StoreProvider store ={store}>
        <App />
    </StoreProvider>
</QueryClientProvider>);
