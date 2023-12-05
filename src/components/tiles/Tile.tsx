import { useState, useRef, useEffect, useContext } from "react";
import { GameContext } from "../../store/game-context/GameContext";

export interface ITile {
    id: string;
    matchingId: number;
    color: string;
    image: string;
}

export default function Tile({
    keepOpen,
    tileDetails,
    showTileCount,
    hasTwoShownTiles,
}: {
    keepOpen: string;
    tileDetails: ITile;
    hasTwoShownTiles: boolean;
    showTileCount: ({ matchId, tileId }: { matchId: number; tileId: string }) => void;
}) {
    const [showTile, setShowTile] = useState(false);

    const gameContext = useContext(GameContext);

    const changeClickStatus = () => {
        setShowTile(!showTile);

        return showTileCount({
            matchId: tileDetails.matchingId,
            tileId: tileDetails.id,
        });
    };

    useEffect(() => {
        // if keepOpen matches tileDetails.id, keep the tile flipped open
        if (keepOpen === tileDetails.id) {
            return setShowTile(true);
        }
        setShowTile(false);
    }, [keepOpen, tileDetails, hasTwoShownTiles]);

    const timeStarted = useRef(false);
    const handleTileClick = () => {
        changeClickStatus();
        if (!gameContext.startGame) {
            gameContext.setStartGame(true);
            timeStarted.current = true;
        }
    };

    let gameMode = "";

    switch (gameContext.gameMode) {
        case "numbers":
            gameMode = "numbers";
            break;
        case "colors":
            gameMode = "colors";
            break;
        case "images":
            gameMode = "images";
            break;
    }

    return (
        <div
            className={`flex justify-center items-center h-[100%] w-[100%] rounded-md cursor-pointer transition duration-100 
            ${showTile && gameMode !== "colors" && "bg-blue-200"}`}
            onClick={handleTileClick}
        >
            <div
                className={`transition duration-100 w-[100%] h-[100%] 
                ${showTile ? "visible" : "invisible"}`}
            >
                {showTile && gameMode === "numbers" ? (
                    <div className="flex justify-center items-center w-[100%] h-[100%] font-semibold text-[2em] ">
                        {tileDetails.matchingId}
                    </div>
                ) : (
                    <div
                        style={{ background: tileDetails.color }}
                        className={`w-[100%] h-[100%] rounded-md border-none`}
                    >
                        {gameMode === "images" && (
                            <img
                                src={tileDetails.image}
                                alt={`image-${tileDetails.id}`}
                                className="w-[100%] h-[100%]"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
