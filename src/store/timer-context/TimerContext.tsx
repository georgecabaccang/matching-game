import { ReactNode, createContext, useRef, useState } from "react";

interface ITimerContext {
    isGameOver: boolean;
    startTimer: () => void;
    stopTimer: () => void;
    time: { milliseconds: number; seconds: number; minutes: number };
}

export const TimerContext = createContext<ITimerContext>({
    isGameOver: false,
    startTimer: () => {},
    stopTimer: () => {},
    time: { milliseconds: 0, seconds: 0, minutes: 0 },
});

export const TimerProvider = ({ children }: { children: ReactNode }) => {
    const [time, setTime] = useState({
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
    });
    const [isGameOver, setIsGameOver] = useState(false);

    const intervalId = useRef(0);
    const timerStarted = useRef(false);
    let startTime = 0;
    let elapsedTime = 0;

    const updateTime = () => {
        if (time.minutes >= 99) {
            clearInterval(intervalId.current);
        }

        elapsedTime = Date.now() - startTime;

        setTime((prev) => {
            return { ...prev, milliseconds: elapsedTime };
        });

        if (elapsedTime >= 1000) {
            setTime((prev) => {
                if (prev.seconds === 59) {
                    return { milliseconds: 0, seconds: 0, minutes: prev.minutes + 1 };
                }
                return { ...prev, milliseconds: 0, seconds: prev.seconds + 1 };
            });
            startTime = Date.now();
        }
    };

    const startTimer = () => {
        if (!timerStarted.current) {
            startTime = Date.now();
            timerStarted.current = true;
            intervalId.current = setInterval(() => {
                updateTime();
            }, 1);
        }
    };

    const stopTimer = () => {
        clearInterval(intervalId.current);
        setIsGameOver(true);
    };

    const timerValues = {
        isGameOver: isGameOver,
        startTimer: startTimer,
        stopTimer: stopTimer,
        time: time,
    };

    return <TimerContext.Provider value={timerValues}>{children}</TimerContext.Provider>;
};
