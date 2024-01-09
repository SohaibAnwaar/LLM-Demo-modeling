import axios from "axios";
import { endPoints } from "../constants";

export const uploadCSV = async(formData: FormData) => {
const data = await axios.post(import.meta.env.VITE_APP_DEV_URL + endPoints.UPLOAD_CSV, formData);
return data.data?.results;
} 


export const askQuestion = async(query: string) => {
const data = await axios.post(import.meta.env.VITE_APP_DEV_URL + endPoints.ASK_QUESTION, {query});
return data.data?.response;
} 