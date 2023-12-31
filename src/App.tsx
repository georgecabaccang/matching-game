import Tiles from "./components/tiles/Tiles";
import { useContext, useEffect, useState } from "react";
import { TileContext } from "./store/tile-context/TileContext";
import Timer from "./components/timer/Timer";
import { TimerProvider } from "./store/timer-context/TimerContext";
import HighScores from "./components/scores/HighScores";
import FullScreenModal from "./components/utils/modals/FullScreenModal";
import { GameContext } from "./store/game-context/GameContext";
import resetIcon from "./assets/icons/reset-icon.png";

function App() {
    const [totaltime, setTotalTime] = useState(0);

    const tileContext = useContext(TileContext);
    const gameContext = useContext(GameContext);

    useEffect(() => {
        if (gameContext.gameMode && gameContext.gameSize) {
            gameContext.setIsGameSet(true);
            tileContext.generateTiles(gameContext.gameMode, gameContext.gameSize);
        }
    }, [gameContext.gameMode, gameContext.gameSize]);

    const restartGame = () => {
        gameContext.resetGameSettings();
    };

    // conditional props to pass to FullScreenModal component
    const showBack = gameContext.gameMode ? true : false;
    const choicesToPass = !gameContext.gameMode ? gameContext.modeChoice : gameContext.sizeChoice;
    const actionToPass = !gameContext.gameMode ? gameContext.setGameMode : gameContext.setGameSize;
    const bodyToShow = !gameContext.gameMode
        ? "Please choose game mode"
        : "Please choose number of tiles";
    const backAction = () => gameContext.setGameMode("");
    // -----------------------------------------------------------

    return (
        <>
            {!gameContext.isGameSet && (
                <FullScreenModal
                    choices={choicesToPass}
                    setStateAction={actionToPass}
                    head="Game Settings"
                    body={bodyToShow}
                    showBack={showBack}
                    backAction={backAction}
                />
            )}
            <div className="w-[100vw] h-[100vh] overflow-auto flex items-center bg-blue-50 flex-col">
                <div
                    className={`mb-[1rem] md:mb-[1rem] flex xxxs:mt-[3rem] md:mt-[5rem] lg:mt-[3rem] xl:mt-[4rem] xxl:mt-[5.3rem] xxxl:mt-[7.5rem] xxxl:mb-[3rem] xxxxl:mt-[10rem] xxxxl:mb-[5rem] justify-center items-center transition duration-300 
                    ${
                        totaltime !== 0
                            ? "scale-150 md:mt-[6rem] lg:mt-[4rem] xl:mt-[4.4rem] xxl:mt-[5.2em] xxxl:mt-[6.5rem] xxxxl:mt-[8.5rem]"
                            : "scale-100"
                    }`}
                >
                    <TimerProvider>
                        <Timer setTotalTime={setTotalTime} />
                    </TimerProvider>
                </div>
                {/* if game is not over, display */}
                {!gameContext.isGameOver && totaltime === 0 && gameContext.gameSize !== 0 && (
                    <div className={`w-[100%] h-[20%]`}>
                        <Tiles />
                    </div>
                )}
                {/* if game is over, display */}
                {totaltime !== 0 ? (
                    <div className="h-[70%] w-[100%] flex justify-center pt-5">
                        <HighScores
                            timeOfUser={totaltime}
                            gameMode={gameContext.gameMode}
                            gameSize={gameContext.gameSize}
                        />
                    </div>
                ) : (
                    ""
                )}
            </div>
            {gameContext.isGameSet && (
                <>
                    <div
                        className={`w-auto h-auto absolute top-10 right-10 md:block hidden cursor-pointer`}
                    >
                        <div
                            className="bg-blue-300 rounded-md px-3 xxl:px-7 py-1 flex hover:bg-blue-400 hover:scale-95 shadow-md hover:shadow-none transition duration-75 font-semibold hover:font-normal"
                            onClick={restartGame}
                        >
                            <div className="w-[1.5rem] xl:w-[1.7rem] xxl:w-[2rem] xxxl:w-[2.4rem] xxxxl:w-[4.3rem] mt-[0.1rem] me-[0.2rem]">
                                <img src={resetIcon} alt="reset-svg" />
                            </div>
                            <div className="text-[1rem] xl:text-[1.2rem] xxl:text-[1.4rem] xxxl:text-[1.7rem] xxxxl:text-[2.5rem]">
                                Restart Game
                            </div>
                        </div>
                    </div>
                    <div
                        className={`w-[2.5rem] absolute top-5 right-5 block md:hidden cursor-pointer`}
                    >
                        <button
                            type="button"
                            className="bg-blue-300 rounded-md px-1 py-1 hover:bg-blue-400 hover:scale-95 shadow-md hover:shadow-none transition duration-75 font-semibold hover:font-normal"
                            onClick={restartGame}
                        >
                            <img src={resetIcon} alt="reset-svg" />
                        </button>
                    </div>
                </>
            )}
        </>
    );
}

export default App;
