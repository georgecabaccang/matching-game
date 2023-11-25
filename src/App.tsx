import Tiles from "./components/tiles/Tiles";
import { useContext, useEffect } from "react";
import { TileContext } from "./store/tile-context/TileContext";
import Timer from "./components/timer/Timer";
import { TimerContext } from "./store/timer-context/TimerContext";
import HighScores from "./components/scores/HighScores";

function App() {
    const tileContext = useContext(TileContext);
    const timerContext = useContext(TimerContext);

    useEffect(() => {
        tileContext.givenTiles;
        tileContext.shuffleTiles();
    }, []);

    return (
        <>
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
