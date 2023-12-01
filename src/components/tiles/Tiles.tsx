import { useContext, useEffect, useState, useRef } from "react";
import TileCard from "../../ui/TileCard";
import Tile from "./Tile";
import { TileContext } from "../../store/tile-context/TileContext";
import { GameContext } from "../../store/game-context/GameContext";
import {
    tilesSize12,
    tilesSize16,
    tilesSize20,
    tilesSize24,
} from "../utils/static-helpers/break-points";

export default function Tiles() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasTwoShownTiles, setHasTwoShownTiles] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

    const count = useRef(0);

    const gameContext = useContext(GameContext);
    const tileContext = useContext(TileContext);

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
                gameContext.setStartGame(false);
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

    const gameSize12 =
        gameContext.gameSize === 12 &&
        `${tilesSize12.xxxs} ${tilesSize12.xxs} ${tilesSize12.xs} ${tilesSize12.sm} ${tilesSize12.md} ${tilesSize12.lg} ${tilesSize12.xl} ${tilesSize12.xxl} ${tilesSize12.xxxl} ${tilesSize12.xxxxl}`;
    const gameSize16 =
        gameContext.gameSize === 16 &&
        `${tilesSize16.xxxs} ${tilesSize16.xxs} ${tilesSize16.xs} ${tilesSize16.sm} ${tilesSize16.md} ${tilesSize16.lg} ${tilesSize16.xl} ${tilesSize16.xxl} ${tilesSize16.xxxl} ${tilesSize16.xxxxl}`;
    const gameSize20 =
        gameContext.gameSize === 20 &&
        `${tilesSize20.xxxs} ${tilesSize20.xxs} ${tilesSize20.xs} ${tilesSize20.sm} ${tilesSize20.md} ${tilesSize20.lg} ${tilesSize20.xl} ${tilesSize20.xxl} ${tilesSize20.xxxl} ${tilesSize20.xxxxl}`;
    const gameSize24 =
        gameContext.gameSize === 24 &&
        `${tilesSize24.xxxs} ${tilesSize24.xxs} ${tilesSize24.xs} ${tilesSize24.sm} ${tilesSize24.md} ${tilesSize24.lg} ${tilesSize24.xl} ${tilesSize24.xxl} ${tilesSize24.xxxl} ${tilesSize24.xxxxl}`;

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className={`w-[100%] h-[100%] flex justify-center`}>
                <ul
                    className={`flex h-[100%] flex-wrap justify-center items-center md:-mt-[1rem]
                    ${gameSize12} ${gameSize16} ${gameSize20} ${gameSize24}
                    `}
                >
                    {tileContext.givenTiles.map((givenTile) => {
                        return (
                            <TileCard
                                key={givenTile.id}
                                matchedPairs={matchedPairs}
                                tileDetails={givenTile}
                                gameSize={gameContext.gameSize}
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
