import { getCurrentUser } from "../api/Auth";

export async function userLoader(){
    return getCurrentUser();
}