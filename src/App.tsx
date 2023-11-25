import Tiles from "./components/tiles/Tiles";
import { useContext, useEffect } from "react";
import { TileContext } from "./store/tile-context/TileContext";
import Timer from "./components/timer/Timer";
import { TimerContext } from "./store/timer-context/TimerContext";

const DUMMY_LEADERS = [
    {
        id: 1,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
    {
        id: 2,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
    {
        id: 3,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
    {
        id: 4,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
    {
        id: 5,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
    {
        id: 6,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
    {
        id: 7,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
    {
        id: 8,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
    {
        id: 9,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
    {
        id: 10,
        name: "Test Name Syempre",
        time: "00:00:00",
    },
];

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
                {timerContext.isGameOver && (
                    <div className="w-[60%] h-[100%] flex justify-center flex-wrap">
                        <ul className="h-[50%] w-[100%] justify-between items-center flex flex-wrap flex-col">
                            {DUMMY_LEADERS.map((leader, index) => {
                                return (
                                    <li
                                        className="h-[20%] w-[50%] flex justify-center items-center"
                                        key={leader.id}
                                    >
                                        <div className="flex gap-3 w-[100%] lg:px-8 xl:px-14 relative">
                                            <div
                                                className={`absolute ${
                                                    index === 9 ? "-ml-[0.3rem]" : ""
                                                }`}
                                            >{`${index + 1}`}</div>
                                            <div className="flex justify-between w-[100%] items-center ml-5">
                                                <div className="">{leader.name}</div>
                                                <div>{leader.time}</div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
