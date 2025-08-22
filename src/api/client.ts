import {Api} from "./Api.ts";

export const api = new Api({
    baseURL: "https://api-divine-grass-2111.fly.dev"
})

export type { PetDto, CreatePetDto, UpdatePetDto } from "./Api";
