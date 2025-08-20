import {useParams} from "react-router-dom";


export default function PetDetails(){
    const {petId} = useParams();

    return(
        <div>
            <h2>Pet Details</h2>
            <p>Pet Id: {petId}</p>
        </div>
    )
}