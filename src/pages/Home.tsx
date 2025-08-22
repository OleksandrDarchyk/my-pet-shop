import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {api} from "../api/client";

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
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.getPets.petGetPets();
                setPets(res.data);
            } catch (e: unknown) {
                if (e instanceof Error) setError(e.message);
                else setError("Failed to load pets");
            } finally {
                setLoading(false);
            }

        })();
    }, []);

    if (error) return <p style={{color: "crimson"}}>{error}</p>;
    if (loading) return <p>Loading...</p>;
    if (pets.length === 0) return <p>Loading...</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Home (pets)</h2>
            <p>Total: {pets.length}</p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pets.map((p) => (
                    <div key={p.id} className="card bg-base-100 shadow">
                        {p.imgurl && (
                            <figure className="p-4">
                                <img
                                    src={p.imgurl}
                                    alt={p.name ?? "Pet"}
                                    className="rounded max-h-48 w-full object-cover"
                                />
                            </figure>
                        )}
                        <div className="card-body">
                            <h3 className="card-title">{p.name}</h3>
                            <p className="text-sm opacity-80">Breed: {p.breed}</p>
                            <div className="card-actions justify-end">
                                <Link to={`/pet/${p.id}`} className="btn btn-outline btn-sm">
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}