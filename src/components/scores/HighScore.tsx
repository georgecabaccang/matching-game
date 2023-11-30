import { IScores } from "./HighScores";

interface ILealderBoard {
    _id?: string;
    name: string;
    time: number;
    size: number;
    mode: string;
}

interface IProps {
    leader: ILealderBoard;
    index: number;
    newHighScore: IScores | null;
    containerPerHighScore: string;
}

export default function HighScore({ leader, index, newHighScore, containerPerHighScore }: IProps) {
    const formatTime = () => {
        const minute = Math.floor(leader.time / 60000).toString();
        const seconds = Math.floor(leader.time / 1000).toString();
        const milliseconds = (leader.time % 1000).toString();

        const minutesToDisplay = minute.length === 1 ? "0" + minute : minute;
        const secondsToDisplay = seconds.length === 1 ? "0" + seconds : seconds;
        const millisecondsToDisplay =
            milliseconds.length === 2
                ? "0" + milliseconds
                : milliseconds.length === 1
                ? "00" + milliseconds
                : +milliseconds === 0
                ? "000"
                : milliseconds;

        return `(${minutesToDisplay}:${secondsToDisplay}:${millisecondsToDisplay})`;
    };

    return (
        <div
            className={`${containerPerHighScore} ${
                leader._id === newHighScore?._id
                    ? "animate-pulse bg-blue-200 rounded-lg font-bold"
                    : ""
            }`}
        >
            <div className="flex gap-3 w-[100%] lg:px-8 xl:px-14 relative">
                <div className={`absolute font-bold ${index === 9 ? "-ml-[0.3rem]" : ""}`}>
                    {`${index + 1}`}
                </div>
                <div
                    className={`flex justify-between w-[100%] items-center ml-5 md:ml-[2rem] xl:ml-[3rem] xxxl:ml-[4rem]`}
                >
                    <div className="">{leader.name}</div>
                    <div>{formatTime()}</div>
                </div>
            </div>
        </div>
    );
}
