import { useEffect, useState } from "react";
import HighScore from "./HighScore";
import { deleteScore, getScoresOfMode } from "../../api-requests/scoreRequests";
import AddScoreForm from "../forms/AddScoreForm";
import loadingSpinner from "../../assets/gifs/spinner.gif";

export interface IScores {
    _id: string;
    name: string;
    time: number;
    mode: string;
    size: number;
}

export default function HighScores({
    timeOfUser,
    gameMode,
    gameSize,
}: {
    timeOfUser: number;
    gameMode: string;
    gameSize: number;
}) {
    const [highScores, setHighScores] = useState<IScores[] | null>(null);
    const [newHighScore, setNewHighScore] = useState<IScores | null>(null);
    const [placeHolderDivs, setPlaceHolderDivs] = useState<any>([]);
    const [isInTopTen, setIsInTopTen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkUserScore = () => {
        if (highScores && !newHighScore) {
            for (let i = 0; i < highScores.length; i++) {
                if (highScores[i].time > timeOfUser) {
                    setIsInTopTen(true);
                    break;
                }
            }
        }
    };

    const getScores = async () => {
        setIsLoading(true);
        const scores = await getScoresOfMode(gameMode, gameSize);
        setHighScores(scores);

        // if response is an empty array, return and make
        // user score elligible for top 10
        if (!scores.length || scores.length !== 10) {
            setIsInTopTen(true);
        }
        setIsLoading(false);
    };

    const containerPerHighScore =
        "h-[15%] w-[100%] md:w-[45%] md:h-[20%] xl:text-[1.3rem] xxxl:text-[1.8rem] xxxxl:text-[2.3rem] flex justify-center items-center";

    // generate blank divs for placeholders when top 10 is not full
    const generateBlankDivs = () => {
        if (highScores) {
            // setPlaceHolderDivs to be empty if top 10 is present
            if (highScores.length === 10) return setPlaceHolderDivs([]);
            const numberOfDivs = 10 - highScores.length;

            const toBePushed: any[] = [];
            for (let i = highScores.length; i < numberOfDivs + highScores.length; i++) {
                const placeHolderDiv = (
                    <div className={`${containerPerHighScore}`} key={i}>
                        <div className="flex gap-3 w-[100%] lg:px-8 xl:px-14 relative">
                            <div
                                className={`absolute font-bold top-[0.65rem] ${
                                    i === 9
                                        ? "-ml-[0.3rem] xxxl:-ml-[0.5rem] xxxxl:-ml-[0.6rem]"
                                        : ""
                                }`}
                            >{`${i + 1}`}</div>
                            <div className={`flex justify-between w-[100%] items-center ml-5`}>
                                <div className="text-[2rem] font-semibold ml-[2rem] -mt-[0.2rem] xl:-mt-[0.1rem] xxl:-mt-[0rem] xxxl:mt-[0.4rem] xxxl:ml-[3.3rem] xxxxl:mt-[0.8rem]">
                                    -
                                </div>
                                <div>{"(00:00:000)"}</div>
                            </div>
                        </div>
                    </div>
                );
                toBePushed.push(placeHolderDiv);
                setPlaceHolderDivs(toBePushed);
            }
        }
    };

    const deleteLastSpotOfTopTen = async (scoreId: string) => {
        await deleteScore(scoreId, gameMode, gameSize);
    };

    const updateCurrentHighScores = (newHighScore: IScores) => {
        if (highScores) {
            // delete last stop of top 10
            if (highScores.length === 10) {
                deleteLastSpotOfTopTen(highScores[highScores.length - 1]._id);
            }
        }

        setIsInTopTen(false);
        getScores();
        setNewHighScore(newHighScore);
    };

    useEffect(() => {
        generateBlankDivs();
        checkUserScore();
    }, [highScores]);

    useEffect(() => {
        getScores();
    }, []);

    return (
        <div className="w-[100%] h-[100%] md:justify-normal flex justify-center flex-wrap">
            {isLoading ? (
                <div className="w-[100%] flex justify-center items-center h-[50%]">
                    <img
                        className={`transition duration-100 w-[3rem] xs:w-[3.2rem] md:w-[4rem] xxl:w-[5rem] xxxl:w-[6rem] xxxxl:w-[7rem]`}
                        src={loadingSpinner}
                        alt="loading-spinner"
                    />
                </div>
            ) : (
                <ul className="h-[50%] w-[100%] overflow-y-auto sm:px-[7rem] md:px-[5rem] md:flex-col md:w-[100%] md:overflow-x-hidden justify-between items-center flex flex-wrap flex-row px-[2rem]">
                    {highScores &&
                        highScores.map((leader, index) => {
                            return (
                                <HighScore
                                    leader={leader}
                                    index={index}
                                    key={leader._id}
                                    newHighScore={newHighScore}
                                    containerPerHighScore={containerPerHighScore}
                                />
                            );
                        })}
                    {placeHolderDivs !== 0 && placeHolderDivs}
                </ul>
            )}
            {isInTopTen && !newHighScore && (
                <div className="w-[100%] flex justify-center">
                    <AddScoreForm
                        gameMode={gameMode}
                        gameSize={gameSize}
                        timeOfUser={timeOfUser}
                        updateCurrentHighScores={updateCurrentHighScores}
                    />
                </div>
            )}
        </div>
    );
}
