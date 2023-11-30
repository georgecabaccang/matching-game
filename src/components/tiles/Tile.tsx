import { useState, useRef, useEffect, useContext } from "react";
import { GameContext } from "../../store/game-context/GameContext";

export interface ITile {
    id: string;
    img: string;
    matchingId: number;
    color: string;
}

export default function Tile({
    disabled,
    tileDetails,
    showTileCount,
    hasTwoShownTiles,
}: {
    disabled: boolean;
    tileDetails: ITile;
    showTileCount: (action: string, match: number) => void;
    hasTwoShownTiles: boolean;
}) {
    const [showTile, setShowTile] = useState(false);
    const isTileShown = useRef(false);

    const gameContext = useContext(GameContext);

    const changeClickStatus = () => {
        setShowTile(!showTile);
        isTileShown.current = !showTile;
        if (isTileShown.current) {
            return showTileCount("add", tileDetails.matchingId);
        }
        showTileCount("subtract", 0);
    };

    useEffect(() => {
        if (hasTwoShownTiles) {
            setShowTile(false);
        }
    }, [hasTwoShownTiles]);

    const timeStarted = useRef(false);
    const handleTileClick = () => {
        changeClickStatus();
        if (!timeStarted.current) {
            gameContext.setGameStart(true);
            timeStarted.current = true;
        }
    };

    const isNumbersGameMode = gameContext.gameMode === "numbers";
    return (
        <div
            className={`flex justify-center items-center h-[100%] w-[100%] rounded-md cursor-pointer transition duration-100 
            ${showTile && "bg-blue-200"} ${disabled && "pointer-events-none"}`}
            onClick={handleTileClick}
        >
            <div
                className={`transition duration-100 w-[100%] h-[100%] 
                ${showTile ? "visible" : "invisible"}`}
            >
                {showTile && isNumbersGameMode ? (
                    <div className="flex justify-center items-center w-[100%] h-[100%] font-semibold text-[2em] ">
                        {tileDetails.matchingId}
                    </div>
                ) : (
                    <div
                        style={{ background: tileDetails.color }}
                        className={`w-[100%] h-[100%] rounded-md border-none`}
                    ></div>
                )}
            </div>
        </div>
    );
}
