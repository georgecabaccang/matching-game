import { ReactNode, createContext } from "react";

interface ITile {
    id: number;
    name: string;
    img: string;
    matchingId: number;
}

interface ITileContext {
    givenTiles: ITile[];
    shuffleTiles: () => Promise<boolean>;
}

export const TileContext = createContext<ITileContext>({
    givenTiles: [],
    shuffleTiles: () => {
        return new Promise(() => {
            return true;
        });
    },
});

export const TileProvider = (props: { children: ReactNode }) => {
    const givenTiles = [
        {
            id: 1,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 1,
        },
        {
            id: 2,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 2,
        },
        {
            id: 3,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 8,
        },
        {
            id: 4,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 4,
        },
        {
            id: 5,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 7,
        },
        {
            id: 6,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 1,
        },
        {
            id: 7,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 5,
        },
        {
            id: 8,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 3,
        },
        {
            id: 9,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 8,
        },
        {
            id: 10,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 6,
        },
        {
            id: 11,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 5,
        },
        {
            id: 12,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 9,
        },
        {
            id: 13,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 7,
        },
        {
            id: 14,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 9,
        },
        {
            id: 15,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 6,
        },
        {
            id: 16,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 11,
        },
        {
            id: 17,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 10,
        },
        {
            id: 18,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 12,
        },
        {
            id: 19,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 4,
        },
        {
            id: 20,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 10,
        },
        {
            id: 21,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 2,
        },
        {
            id: 22,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 12,
        },
        {
            id: 23,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 11,
        },
        {
            id: 24,
            name: "Tile 1",
            img: "some image 1",
            matchingId: 3,
        },
    ];
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

    const values: ITileContext = { givenTiles: givenTiles, shuffleTiles: shuffleTiles };

    return <TileContext.Provider value={values}>{props.children}</TileContext.Provider>;
};
