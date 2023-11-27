import { useContext, useEffect, useState, useRef } from "react";
import TileCard from "../../ui/TileCard";
import Tile from "./Tile";
import { TileContext } from "../../store/tile-context/TileContext";
import { TimerContext } from "../../store/timer-context/TimerContext";
import { GameContext } from "../../store/game-context/GameContext";

export default function Tiles() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasTwoShownTiles, setHasTwoShownTiles] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

    const count = useRef(0);

    const gameContext = useContext(GameContext);
    const tileContext = useContext(TileContext);
    const timerContext = useContext(TimerContext);

    const checkShuffledTiles = async () => {
        const isShuffled = await tileContext.shuffleTiles();
        if (isShuffled) {
            return setIsLoading(false);
        }
    };

    // shuffle tiles
    useEffect(() => {
        checkShuffledTiles();
    }, []);
    // -----------------------------------------------------------

    // resets matched pairs when restarting the game
    useEffect(() => {
        setMatchedPairs([]);
    }, [gameContext.gameMode]);

    const firstMatch = useRef(0);
    const secondMatch = useRef(0);

    const resetMatches = () => {
        firstMatch.current = 0;
        secondMatch.current = 0;
    };

    // resets tiles and disables tiles to stop user from clicking
    // more than two tiles
    const resetTile = async () => {
        count.current = 0;
        setDisabled(true);
        setTimeout(() => {
            resetMatches();
            setHasTwoShownTiles(true);
            setDisabled(false);
        }, 100);
        setHasTwoShownTiles(false);
    };
    // -----------------------------------------------------------

    // handles maximum opened tiles shown
    const showTileCount = (action: string, match: number) => {
        // set to match values depending on number of opened tiles
        if (firstMatch.current === 0) {
            firstMatch.current = match;
        } else {
            secondMatch.current = match;
        }

        if (firstMatch.current === secondMatch.current) {
            // check if last match will be added to matchedPairs,
            // if so, stop the timer
            const lastMatchWillBeAdded =
                Math.abs(matchedPairs?.length * 2) === tileContext.givenTiles?.length - 2;
            if (lastMatchWillBeAdded) {
                timerContext.stopTimer();
            }

            setMatchedPairs([...matchedPairs, firstMatch.current]);
            return resetTile();
        }

        switch (action) {
            case "add":
                count.current++;
                break;
            case "subtract":
                resetMatches();
                count.current--;
                break;
        }
        if (count.current >= 2 || count.current < 0) {
            resetTile();
        }
    };
    // -----------------------------------------------------------

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="w-[80%] flex justify-center items-center py-10 xl:px-[5rem]">
                <ul className="flex w-[100%] flex-wrap gap-[2rem] justify-center items-center">
                    {tileContext.givenTiles.map((givenTile) => {
                        return (
                            <TileCard
                                key={givenTile.id}
                                matchedPairs={matchedPairs}
                                tileDetails={givenTile}
                            >
                                <Tile
                                    disabled={disabled}
                                    hasTwoShownTiles={hasTwoShownTiles}
                                    tileDetails={givenTile}
                                    showTileCount={showTileCount}
                                />
                            </TileCard>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
