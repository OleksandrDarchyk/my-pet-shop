import {createBrowserRouter} from "react-router-dom";
import App  from "./App.tsx";

function Home() {
  return <h2>Home(I will add here list of pets)</h2>;
}

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {index: true, element: <Home />},
          ]
    }
])