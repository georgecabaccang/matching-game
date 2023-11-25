import { useState, useRef, useEffect, useContext } from "react";
import { TimerContext } from "../../store/timer-context/TimerContext";

export interface ITile {
    id: number;
    name: string;
    img: string;
    matchingId: number;
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

    const timerContext = useContext(TimerContext);

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
            timerContext.startTimer();
            timeStarted.current = true;
        }
    };

    return (
        <div
            className={`flex justify-center items-center min-h-full min-w-full rounded-md cursor-pointer transition duration-100 ${
                showTile ? "bg-blue-200" : ""
            } ${disabled ? "pointer-events-none" : ""}`}
            onClick={handleTileClick}
        >
            <div className={`transition duration-100 ${showTile ? "visible" : "invisible"}`}>
                {showTile && tileDetails.matchingId}
            </div>
        </div>
    );
}
