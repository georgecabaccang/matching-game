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
    // const [disabled, setDisabled] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [keepOpen, setKeepOpen] = useState("");

    // const count = useRef(0);

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

    const firstMatch = useRef({ matchId: 0, tileId: "" });
    const secondMatch = useRef({ matchId: 0, tileId: "" });

    const resetMatches = () => {
        firstMatch.current = { matchId: 0, tileId: "" };
        secondMatch.current = { matchId: 0, tileId: "" };
    };

    // resets tiles and disables tiles to stop user from clicking
    // more than two tiles
    // const resetTile = async () => {
    //     // count.current = 0;
    //     // setDisabled(true);
    //     // resetMatches();
    //     // setTimeout(() => {
    //     setHasTwoShownTiles((prev) => {
    //         return !prev;
    //     });
    //     // setDisabled(false);
    //     // }, 100);
    //     // setHasTwoShownTiles(false);
    // };
    // -----------------------------------------------------------

    const testForMatch = (clickedTileDetails: { matchId: number; tileId: string }) => {
        if (firstMatch.current.matchId === clickedTileDetails.matchId) {
            // check if the very last match will be added to matchedPairs,
            // if so, stop the timer and end the game
            const lastMatchWillBeAdded =
                Math.abs(matchedPairs?.length * 2) === tileContext.givenTiles?.length - 2;
            if (lastMatchWillBeAdded) {
                gameContext.setStartGame(false);
                return true;
            }

            // if last pair is not yet added, add recently matched tiles' matchId
            // and reset everything
            setMatchedPairs([...matchedPairs, firstMatch.current.matchId]);
            setHasTwoShownTiles(!hasTwoShownTiles);
            setKeepOpen("");
            resetMatches();
        }
    };

    useEffect(() => {
        // resetTile();
    }, [keepOpen]);

    // handles maximum opened tiles shown
    const showTileCount = (clickedTileDetails: { matchId: number; tileId: string }) => {
        // if player flips one more tile, (making it 3 total tiles are flipped),
        // will automatically close all tiles except for last clicked tile which will be keepOpen
        if (firstMatch.current.matchId && secondMatch.current.matchId) {
            resetMatches();
            firstMatch.current = clickedTileDetails;
            setHasTwoShownTiles(!hasTwoShownTiles);
            return setKeepOpen(clickedTileDetails.tileId);
        }

        // if flipped tile is clicked again while it is flipped open,
        // tile will be flipped back and be removed from tiles that can be currently matched
        if (secondMatch.current.tileId === clickedTileDetails.tileId) {
            secondMatch.current = { matchId: 0, tileId: "" };
        }

        if (firstMatch.current.tileId === clickedTileDetails.tileId) {
            firstMatch.current = { matchId: 0, tileId: "" };
        }
        // --------------------------------------------------------------

        // set details of flipped tile to firstMatch
        if (firstMatch.current.matchId === 0) {
            return (firstMatch.current = clickedTileDetails);
        }

        // if firstMatch is already taken, insert details of 2nd flipped
        // tile to secondMatch
        if (secondMatch.current.matchId === 0) {
            secondMatch.current = clickedTileDetails;
        }

        // if firstMatch and secondMatch has details, check or test if those two match.
        if (firstMatch.current.matchId && secondMatch.current.matchId) {
            testForMatch(secondMatch.current);
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
                                gameMode={gameContext.gameMode}
                            >
                                <Tile
                                    hasTwoShownTiles={hasTwoShownTiles}
                                    keepOpen={keepOpen}
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
