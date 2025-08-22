import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { api } from "../api/client";
import type {AxiosError} from "axios";


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
    const [saving, setSaving] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const navigate = useNavigate();


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

    async function handleToggleSold() {
        if (!pet?.id) return;

        const newSoldStatus = !pet.sold;
        setSaving(true);
        try {
            const res = await api.updatePet.petUpdatePet({
                id: pet.id,
                name: pet.name,
                breed: pet.breed,
                imgurl: pet.imgurl,
                sold: newSoldStatus,
            });
            setPet(res.data);
        } catch (e) {
            const err = e as AxiosError<{ title?: string }>;
            alert(err.response?.data?.title ?? "Failed to update pet");
        } finally {
            setSaving(false);
        }
    }

    async function handleDeletePet() {
        if (!pet?.id) return;
        if (!confirm("Delete this pet?")) return;

        setDeleting(true);
        try {
            await api.deletePet.petDeletePet({ id: pet.id });
            alert("Pet deleted");
            navigate("/")
        }catch (e){
            const err = e as AxiosError<{ title?: string }>;
            alert(err.response?.data?.title ?? "Failed to delete pet");
        }
        finally {
            setDeleting(false);
        }
    }

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
            <button className={`btn ${pet?.sold ? "btn-warning":"btn-success"} w-48`}
                    disabled={saving}
                    onClick={handleToggleSold}>
                {saving ? "Saving..." : pet.sold ? "Mark as Available" : "Mark as Sold"}
            </button>

            <button   className="btn btn-error w-48 ml-2"
            disabled={saving}
            onClick={handleDeletePet}>
                {deleting ? "Deleting..." : "Delete Pet"}
            </button>
        </div>
    );
}
