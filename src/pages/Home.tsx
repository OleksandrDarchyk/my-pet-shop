import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";

type Pet = {
    id?: string;
    name?: string;
    breed?: string;
    imgurl?: string;
    sold?: boolean;
};

export default function Home() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.getPets.petGetPets();
                setPets(res.data);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("Failed to load pets");
                }
            }

        })();
    }, []);

    if (error) return <p style={{ color: "crimson" }}>{error}</p>;
    if (pets.length === 0) return <p>Loading...</p>;

    return (
        <div>
            <h2>Home (pets)</h2>
            <p>Total: {pets.length}</p>

            <ul>
                {pets.map((p) => (
                    <li key={p.id}>
                        <div><b>id:</b> {String(p.id)}</div>
                        <Link to={`/pet/${p.id}`}>{p.name}</Link>
                    </li>
                ))}
            </ul>


            <pre>{JSON.stringify(pets, null, 2)}</pre>
        </div>
    );
}
