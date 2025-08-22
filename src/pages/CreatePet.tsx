import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {api} from "../api/client";
import type {AxiosError} from "axios";

export default function CreatePet() {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [imgurl, setImgurl] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
       if(!name.trim() || !breed.trim() || !imgurl.trim()) {
          alert("Fill up all fields!");
            return;
       }
       setSubmitting(true);
       try {
           const res = await api.createPet.petCreatePet({name, breed, imgurl,});
           navigate(`/pet/${res.data.id}`);
       }
       catch (e: unknown) {
           const err = e as AxiosError<{ title?: string }>;
           alert(err.response?.data?.title ?? "Failed to create pet");
       }
       finally {
           setSubmitting(false);
       }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <h2 className="text-2xl font-semibold">Create a New Pet</h2>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rex"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Breed</span>
                </label>
                <input
                    className="input input-bordered w-full"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="Dog"
                    required
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Image URL</span>
                </label>
                <input
                    className="input input-bordered w-full"
                    value={imgurl}
                    onChange={(e) => setImgurl(e.target.value)}
                    placeholder="https://..."
                    type="url"
                    required
                />
            </div>

            <p className="text-sm opacity-70">
                Preview: <b>{name || "—"}</b> • <b>{breed || "—"}</b>
            </p>

            {imgurl && (
                <img src={imgurl} alt="preview" className="rounded border max-w-xs"/>
            )}

            <button type="submit" className="btn btn-primary w-full mt-4" disabled={submitting}>
                {submitting ? "Creating..." : "Create Pet"}
            </button>

        </form>
    );
}
