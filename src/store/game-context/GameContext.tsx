import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface IGameContext {
    gameMode: string;
    gameSize: number;
    setGameMode: Dispatch<SetStateAction<string>>;
    setGameSize: Dispatch<SetStateAction<number>>;
    modeChoice: { label: string; value: string }[];
    sizeChoice: { label: string; value: number }[];
}

export const GameContext = createContext<IGameContext>({
    gameMode: "",
    gameSize: 0,
    setGameMode: () => {},
    setGameSize: () => {},
    modeChoice: [],
    sizeChoice: [],
});

export const GameProvider = (props: { children: ReactNode }) => {
    const [gameMode, setGameMode] = useState("");
    const [gameSize, setGameSize] = useState(0);

    const modeChoice = [
        {
            label: "Number",
            value: "numbers",
        },
        {
            label: "Colors",
            value: "colors",
        },
    ];

    const sizeChoice = [
        {
            label: "16 Tiles",
            value: 16,
        },
        {
            label: "24 Tiles",
            value: 24,
        },
    ];

    const GameContextValues: IGameContext = {
        gameMode: gameMode,
        gameSize: gameSize,
        setGameMode: setGameMode,
        setGameSize: setGameSize,
        modeChoice: modeChoice,
        sizeChoice: sizeChoice,
    };

    return <GameContext.Provider value={GameContextValues}>{props.children}</GameContext.Provider>;
};
