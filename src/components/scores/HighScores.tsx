import { useEffect } from "react";
import HighScore from "./HighScore";
import { getScoresOfMode } from "../../api-requests/scoreRequests";

const DUMMY_LEADERS = [
    {
        _id: "1",
        name: "Test Name Syempre",
        time: 120,
        mode: "numbers",
        size: 12,
    },
];

export default function HighScores() {
    useEffect(() => {
        getScoresOfMode("colors", 12);
    }, []);
    return (
        <div className="w-[60%] h-[100%] flex justify-center flex-wrap">
            <ul className="h-[50%] w-[100%] justify-between items-center flex flex-wrap flex-col">
                {DUMMY_LEADERS.map((leader, index) => {
                    return <HighScore leader={leader} index={index} key={index} />;
                })}
            </ul>
        </div>
    );
}
