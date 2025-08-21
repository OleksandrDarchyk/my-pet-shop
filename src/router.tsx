import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import PetDetails from "./pages/PetDetails";
import CreatePet from "./pages/CreatePet.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {index: true, element: <Home/>},
            {path: "create", element: <CreatePet/>},
            {path: "pet/:petId", element: <PetDetails/>},
        ],
    },
]);
