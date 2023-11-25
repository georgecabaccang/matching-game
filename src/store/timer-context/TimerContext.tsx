import { ReactNode, createContext, useRef, useState } from "react";

interface ITimerContext {
    totalTimeInMilliseconds: number;
    isGameOver: boolean;
    startTimer: () => void;
    stopTimer: () => void;
    time: { milliseconds: number; seconds: number; minutes: number };
}

export const TimerContext = createContext<ITimerContext>({
    totalTimeInMilliseconds: 0,
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
    const [totalTimeInMilliseconds, setTotalTimeInMilliseconds] = useState(0);

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

        // convert all time into milliseconds
        const minuteToSeconds = time.minutes * 60;
        const totalSeconds = minuteToSeconds + time.seconds;
        const totalMilliseconds = totalSeconds * 1000 + time.milliseconds;
        setTotalTimeInMilliseconds(totalMilliseconds);
    };

    const timerValues = {
        totalTimeInMilliseconds: totalTimeInMilliseconds,
        isGameOver: isGameOver,
        startTimer: startTimer,
        stopTimer: stopTimer,
        time: time,
    };

    return <TimerContext.Provider value={timerValues}>{children}</TimerContext.Provider>;
};
