import Tiles from "./components/tiles/Tiles";
import { useContext, useEffect, useState } from "react";
import { TileContext } from "./store/tile-context/TileContext";
import Timer from "./components/timer/Timer";
import { TimerContext } from "./store/timer-context/TimerContext";
import HighScores from "./components/scores/HighScores";
import FullScreenModal from "./components/utils/modals/FullScreenModal";
import { GameContext } from "./store/game-context/GameContext";

function App() {
    const [isGameSet, setIsGameSet] = useState(false);

    const tileContext = useContext(TileContext);
    const timerContext = useContext(TimerContext);
    const gameContext = useContext(GameContext);

    useEffect(() => {
        if (gameContext.gameMode && gameContext.gameSize) {
            setIsGameSet(true);
            tileContext.generateTiles(gameContext.gameMode, gameContext.gameSize);
        }
    }, [gameContext.gameMode, gameContext.gameSize]);

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
            {!isGameSet && (
                <FullScreenModal
                    choices={choicesToPass}
                    setStateAction={actionToPass}
                    head="Game Settings"
                    body={bodyToShow}
                    showBack={showBack}
                    backAction={backAction}
                />
            )}
            <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-blue-50 flex-col">
                <div
                    className={`w-[100%] h-[50%] flex justify-center items-center transition duration-300 
                    ${timerContext.isGameOver ? "scale-150" : "scale-100"}`}
                >
                    <Timer />
                </div>
                {/* if game is not over, display */}
                {!timerContext.isGameOver && (
                    <div className={`w-[100%] h-[100%] flex justify-center items-center`}>
                        <Tiles />
                    </div>
                )}
                {/* if game is over, display */}
                {timerContext.isGameOver && <HighScores />}
            </div>
        </>
    );
}

export default App;
