import { useRef } from "react";
import { addScore } from "../../api-requests/scoreRequests";
import { IScores } from "../scores/HighScores";

export default function AddScoreForm({
    gameMode,
    gameSize,
    timeOfUser,
    updateCurrentHighScores,
}: {
    gameMode: string;
    gameSize: number;
    timeOfUser: number;
    updateCurrentHighScores: (payload: IScores) => void;
}) {
    const nameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            name: nameRef.current!.value,
            time: timeOfUser,
            mode: gameMode,
            size: gameSize,
        };

        const newHighScore = (await addScore(payload)) as IScores;
        updateCurrentHighScores(newHighScore);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-[100%] flex items-center flex-col px-[3rem] xs:px-[5rem] xs:text-[1.1rem] sm:px-[12rem] sm:text-[1.2rem] md:px-[15rem] md:text-[1.3rem] lg:px-[23rem] xl:px-[30rem] xl:text-[1.5rem] xxl:px-[35rem] xxl:text-[1.7rem] xxxl:px-[45rem] xxxl:text-[2.2rem] xxxxl:px-[60rem] xxxxl:text-[3.2rem]"
        >
            <span className="text-[1.1em] font-bold">Congratulations!</span>
            <span className="text-blue-400 text-[1em]"> You made the Top 10!</span>
            <label htmlFor="enter-name" className="text-[0.8em] font-semibold">
                Enter Desired Name:
            </label>
            <input
                id="enter-name"
                type="text"
                autoFocus
                ref={nameRef}
                maxLength={10}
                className="px-[4rem] text-[0.8em] overflow-x-visible bg-transparent border-b-2 w-[100%] text-center border-blue-200 focus:outline-none py-2"
            />
            <span className="text-[0.5em] mt-2">Max of 10 Characters</span>
        </form>
    );
}
