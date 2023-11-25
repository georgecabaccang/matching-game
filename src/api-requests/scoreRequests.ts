import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const getScoresOfMode = async (mode: string, size: number) => {
    console.log(apiURL);
    try {
        const response = await axios.get(`${apiURL}/scores/get-scores/${mode}/${size}`);
        console.log(response);
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};
