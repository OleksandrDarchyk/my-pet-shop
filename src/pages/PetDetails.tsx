import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api, type PetDto, type UpdatePetDto} from "../api/client";
import type {AxiosError} from "axios";
import toast from "react-hot-toast";


export default function PetDetails() {
    const { petId } = useParams();
    const [pet, setPet] = useState<PetDto | null>(null);
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
            } catch (e) {
                const err = e as AxiosError<{ title?: string }>;
                if (err.response?.status === 404) {
                    toast.error("Pet not found");
                    navigate("/");
                    return;
                }
                toast.error(err.response?.data?.title ?? "Failed to load pet");
                setError(err.message);
            }

        })();
    }, [petId, navigate]);

    if (error) return <p style={{ color: "crimson" }}>{error}</p>;
    if (!pet) return <p>Loading...</p>;

    async function handleToggleSold() {
        if (!pet?.id) return;

        const newSoldStatus = !pet.sold;
        setSaving(true);
        try {
            const payload : UpdatePetDto = {
                id: pet.id,
                name: pet.name,
                breed: pet.breed,
                imgurl: pet.imgurl,
                sold: newSoldStatus,
            };
            const res = await api.updatePet.petUpdatePet(payload);
            setPet(res.data);
            toast.success(`Pet marked as ${newSoldStatus ? "sold" : "available"}`);
        } catch (e) {
            const err = e as AxiosError<{ title?: string }>;
            toast.error(err.response?.data?.title ?? "Failed to update pet");
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
          toast.success("Pet deleted ");
            navigate("/")
        }catch (e){
            const err = e as AxiosError<{ title?: string }>;
           toast.error(err.response?.data?.title ?? "Failed to delete pet");
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
            disabled={deleting}
            onClick={handleDeletePet}>
                {deleting ? "Deleting..." : "Delete Pet"}
            </button>
        </div>
    );
}
