import {useState} from "react";

export default function CreatePet() {
    const [name , setName] = useState("");
    return (
        <div className="space y-4 max-w-md">
            <h2 className="text-2xl font-semibold">Create a New Pet</h2>

            <label className="form-control">
                <span className="label-text"></span>
                <input
                className="input "
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rex"/>
            </label>

            <p className="text-sm opacity-70">
                Preview: <b>{name || "-"}</b>
            </p>
        </div>
    )
}