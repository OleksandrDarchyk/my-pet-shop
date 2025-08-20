import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/client";

type Pet = {
    id?: string;
    name?: string;
    breed?: string;
    imgurl?: string;
    sold?: boolean;
};

export default function PetDetails() {
    const { petId } = useParams();
    const [pet, setPet] = useState<Pet | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!petId) return;

        console.log("petId from URL =", petId);
        (async () => {
            try {
                const res = await api.getPetById.petGetPetById({ id: petId.toString() });
                setPet(res.data);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("Failed to load pet");
                }
            }

        })();
    }, [petId]);

    if (error) return <p style={{ color: "crimson" }}>{error}</p>;
    if (!pet) return <p>Loading...</p>;

    return (
        <div>
            <h2>Pet Details</h2>
            <p><b>ID:</b> {pet.id}</p>
            <p><b>Name:</b> {pet.name}</p>
            <p><b>Breed:</b> {pet.breed}</p>
            <p><b>Sold:</b> {String(pet.sold)}</p>
            {pet.imgurl && (
                <div>
                    <img src={pet.imgurl} alt={pet.name ?? "Pet"} style={{ maxWidth: 320 }} />
                </div>
            )}
        </div>
    );
}
