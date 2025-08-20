import {createBrowserRouter} from "react-router-dom";
import App  from "./App.tsx";
import CreatePet from "./CreatePet.tsx";
import PetDetails from "./pages/PetDetails.tsx";
import {useEffect,useState} from "react";
import {api} from "./api/client.ts";

function Home() {
    const [pets, setPets] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const res = await api.getPets.petGetPets();
            setPets(res.data);
        })();
    }, []);

    if (pets.length === 0) return <p>Loading...</p>;

    return (
        <div>
            <h2>Home (pets)</h2>
            <p>Total: {pets.length}</p>
        </div>
    );
}
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {index: true, element: <Home />},
          {path: "create", element:<CreatePet></CreatePet>},
          {path: "pet/:petId",element:<PetDetails></PetDetails>}
          ]
    }
])