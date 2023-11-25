import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const getScoresOfMode = async (mode: string, size: number) => {
    try {
        const { data } = await axios.get(`${apiURL}/scores/get-scores/${mode}/${size}`);
        console.log(data);
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};

export const addScore = async (payload: {
    name: string;
    time: number;
    mode: string;
    size: number;
}) => {
    try {
        const { data } = await axios.post(`${apiURL}/scores/add-score`, { payload });
        console.log(data);
    } catch (error) {}
};
