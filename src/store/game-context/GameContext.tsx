import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface IGameContext {
    isGameSet: boolean;
    gameMode: string;
    gameSize: number;
    setIsGameSet: Dispatch<SetStateAction<boolean>>;
    setGameMode: Dispatch<SetStateAction<string>>;
    setGameSize: Dispatch<SetStateAction<number>>;
    modeChoice: { label: string; value: string }[];
    sizeChoice: { label: string; value: number }[];
    resetGameSettings: () => void;
    isGameOver: boolean;
    setIsGameOver: Dispatch<SetStateAction<boolean>>;
    startGame: boolean;
    setStartGame: Dispatch<SetStateAction<boolean>>;
}

export const GameContext = createContext<IGameContext>({
    isGameSet: false,
    gameMode: "",
    gameSize: 0,
    setIsGameSet: () => {},
    setGameMode: () => {},
    setGameSize: () => {},
    modeChoice: [],
    sizeChoice: [],
    resetGameSettings: () => {},
    isGameOver: false,
    setIsGameOver: () => {},
    startGame: false,
    setStartGame: () => {},
});

export const GameProvider = (props: { children: ReactNode }) => {
    const [isGameSet, setIsGameSet] = useState(false);
    const [gameMode, setGameMode] = useState("");
    const [gameSize, setGameSize] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [startGame, setStartGame] = useState(false);

    const modeChoice = [
        {
            label: "Number",
            value: "numbers",
        },
        {
            label: "Colors",
            value: "colors",
        },
        {
            label: "Images",
            value: "images",
        },
    ];

    const sizeChoice = [
        {
            label: "12 Tiles",
            value: 12,
        },
        {
            label: "16 Tiles",
            value: 16,
        },
        {
            label: "20 Tiles",
            value: 20,
        },
        {
            label: "24 Tiles",
            value: 24,
        },
    ];

    const resetGameSettings = () => {
        setIsGameSet(false);
        setGameMode("");
        setGameSize(0);
        setIsGameOver(false);
        setStartGame(false);
    };

    const GameContextValues: IGameContext = {
        isGameSet: isGameSet,
        gameMode: gameMode,
        gameSize: gameSize,
        setIsGameSet: setIsGameSet,
        setGameMode: setGameMode,
        setGameSize: setGameSize,
        modeChoice: modeChoice,
        sizeChoice: sizeChoice,
        resetGameSettings: resetGameSettings,
        isGameOver: isGameOver,
        setIsGameOver: setIsGameOver,
        startGame: startGame,
        setStartGame: setStartGame,
    };

    return <GameContext.Provider value={GameContextValues}>{props.children}</GameContext.Provider>;
};
