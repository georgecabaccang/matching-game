import { ReactNode, createContext } from "react";
import COLORS from "../../components/utils/static-helpers/colors";

interface ITile {
    id: string;
    img: string;
    matchingId: number;
    color: string;
}

export interface ITileContext {
    givenTiles: ITile[];
    shuffleTiles: () => Promise<boolean>;
    generateTiles: (mode: string, size: number) => void;
}

export const TileContext = createContext<ITileContext>({
    givenTiles: [],
    shuffleTiles: () => {
        return new Promise(() => {
            return true;
        });
    },
    generateTiles: () => {},
});

export const TileProvider = (props: { children: ReactNode }) => {
    const givenTiles: ITile[] = [];

    const generateRandomIndex = (maxLimit: number) => {
        const index = Math.random() * maxLimit;
        return Math.floor(index);
    };

    const shuffleTiles = async () => {
        for (let i = 0; i < givenTiles.length; i++) {
            const indexOfTile = generateRandomIndex(givenTiles.length + 1);
            if (!givenTiles[indexOfTile]) continue;
            [givenTiles[i], givenTiles[indexOfTile]] = [givenTiles[indexOfTile], givenTiles[i]];
        }
        return true;
    };

    // get random color from COLORS
    const getColor = (size: number) => {
        const indexOfColor = generateRandomIndex(size + 1);
        return { retrievedColor: COLORS[indexOfColor], indexOfColor };
    };

    const generateTiles = (mode: string, size: number) => {
        for (let i = 1; i < size / 2 + 1; i++) {
            let color = "";
            if (mode === "colors") {
                const { retrievedColor, indexOfColor } = getColor(size);
                color = retrievedColor;

                // remove color from array to prevent duplications
                COLORS.splice(indexOfColor, 1);
            }

            // create newTile with properties
            const newTile: ITile = {
                id: "",
                img: "",
                matchingId: i,
                color: color,
            };

            // push created newTile twice but with different IDs
            givenTiles.push({ ...newTile, id: Math.random().toString(36).substring(1, 9) });
            givenTiles.push({ ...newTile, id: Math.random().toString(36).substring(1, 9) });
        }
        // shuffle tiles after generating them
        shuffleTiles();
    };

    const values: ITileContext = {
        givenTiles: givenTiles,
        shuffleTiles: shuffleTiles,
        generateTiles: generateTiles,
    };

    return <TileContext.Provider value={values}>{props.children}</TileContext.Provider>;
};
