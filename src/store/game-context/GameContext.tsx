import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface IGameContext {
    mode: string;
    size: number;
    setGameMode: Dispatch<SetStateAction<string>>;
    setGameSize: Dispatch<SetStateAction<number>>;
}

export const GameContext = createContext<IGameContext>({
    mode: "",
    size: 0,
    setGameMode: () => {},
    setGameSize: () => {},
});

export const GameProvider = (props: { children: ReactNode }) => {
    const [gameMode, setGameMode] = useState("");
    const [gameSize, setGameSize] = useState(0);

    const GameContextValues: IGameContext = {
        mode: gameMode,
        size: gameSize,
        setGameMode: setGameMode,
        setGameSize: setGameSize,
    };

    return <GameContext.Provider value={GameContextValues}>{props.children}</GameContext.Provider>;
};
