import axios from "axios";
import { IScores } from "../components/scores/HighScores";

const apiURL = import.meta.env.VITE_API_URL;

export const getScoresOfMode = async (mode: string, size: number) => {
    try {
        const { data } = await axios.get(`${apiURL}/scores/get-scores/${mode}/${size}`);
        return data;
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
        return data as IScores;
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};

export const deleteScore = async (scoreId: string, mode: string, size: number) => {
    try {
        await axios.delete(`${apiURL}/scores/delete-score`, {
            data: {
                scoreId: scoreId,
                mode: mode,
                size: size,
            },
        });
    } catch (error) {
        if (error) {
            console.log(error);
        }
    }
};
