import { ReactNode, createContext } from "react";
import COLORS from "../../components/utils/static-helpers/colors";
import HORROR_1 from "../../components/utils/static-helpers/horror-1-images";

interface ITile {
    id: string;
    matchingId: number;
    color: string;
    image: string;
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
        const index = Math.random() * maxLimit + 1;
        return Math.floor(index);
    };

    const shuffleTiles = async () => {
        for (let i = 0; i < givenTiles.length; i++) {
            const indexOfTile = generateRandomIndex(givenTiles.length);
            if (!givenTiles[indexOfTile]) continue;
            [givenTiles[i], givenTiles[indexOfTile]] = [givenTiles[indexOfTile], givenTiles[i]];
        }
        return true;
    };

    // get random color from COLORS
    const getOtherTileProps = (arrayStore: string[]) => {
        const indexOfProp = generateRandomIndex(arrayStore.length - 1);
        // if legnth of array is just 1, use 0 index
        const retrievedProps = arrayStore[arrayStore.length === 1 ? 0 : indexOfProp];
        // remove taken item from array to prevent duplications
        arrayStore.splice(indexOfProp, 1);

        // return color
        return retrievedProps;
    };

    const generateTiles = (mode: string, size: number) => {
        let arrayToRetrieveFrom: string[] = [];

        switch (mode) {
            case "images":
                arrayToRetrieveFrom = HORROR_1;
                break;
            case "colors":
                arrayToRetrieveFrom = COLORS;
                break;
        }

        const copyOfArrayToRetrieveFrom = [...arrayToRetrieveFrom];

        givenTiles.splice(0, givenTiles.length);
        for (let i = 1; i < size / 2 + 1; i++) {
            let color = "";
            let image = "";
            if (mode !== "numbers") {
                const retrievedProps = getOtherTileProps(copyOfArrayToRetrieveFrom);
                if (mode === "colors") {
                    color = retrievedProps;
                }
                if (mode === "images") {
                    image = retrievedProps;
                }
            }

            // create newTile with properties
            const newTile: ITile = {
                id: "",
                matchingId: i,
                color: color,
                image: image,
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
