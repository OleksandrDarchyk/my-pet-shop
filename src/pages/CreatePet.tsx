import { useState } from "react";

export default function CreatePet() {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [imgurl, setImgurl] = useState("");

    function handleSubmit() {
        console.log("Creating pet", { name, breed, imgurl });
    }

    return (
        <div className="space-y-4 max-w-md">
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
                />
            </div>

            <p className="text-sm opacity-70">
                Preview: <b>{name || "—"}</b> • <b>{breed || "—"}</b>
            </p>

            {imgurl && (
                <img src={imgurl} alt="preview" className="rounded border max-w-xs" />
            )}

            <button className="btn btn-primary w-full mt-4"
            onClick={handleSubmit}></button>
        </div>
    );
}
