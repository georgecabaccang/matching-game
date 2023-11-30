import { useContext, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { TimerContext } from "../../store/timer-context/TimerContext";
import TimeDisplay from "./TimeDisplay";
import { GameContext } from "../../store/game-context/GameContext";

interface ITimerProps {
    resetGame: boolean;
    setTimeInMilliseconds: Dispatch<SetStateAction<number>>;
}

export default function Timer({ resetGame, setTimeInMilliseconds }: ITimerProps) {
    const { time, resetTimerValues, startTimer, stopTimer, totalTimeInMilliseconds } =
        useContext(TimerContext);
    const { gameStart } = useContext(GameContext);

    const minutes = useRef("00");
    const seconds = useRef("00");
    const milliseconds = useRef("000");

    const formatTime = () => {
        // format milliseconds
        if (time.milliseconds < 10) {
            milliseconds.current = `00${time.milliseconds}`;
        }
        if (time.milliseconds < 100 && time.milliseconds > 10) {
            milliseconds.current = `0${time.milliseconds}`;
        }
        if (time.milliseconds < 1000 && time.milliseconds > 100) {
            milliseconds.current = `${time.milliseconds}`;
        }

        // format seconds
        if (time.seconds < 10) {
            seconds.current = `0${time.seconds}`;
        } else {
            seconds.current = `${time.seconds}`;
        }

        // format minutes
        if (time.minutes < 10) {
            minutes.current = `0${time.minutes}`;
        } else {
            minutes.current = `${time.minutes}`;
        }
    };

    useEffect(() => {
        formatTime();
    }, [time]);

    useEffect(() => {
        resetTimerValues();
    }, [resetGame]);

    useEffect(() => {
        if (gameStart) {
            return startTimer();
        }
        stopTimer();
        return;
    }, [gameStart]);

    useEffect(() => {
        setTimeInMilliseconds(totalTimeInMilliseconds);
    }, [totalTimeInMilliseconds]);

    return (
        <div
            className={`mb-[1rem] md:mb-[1rem] flex xxxs:mt-[3rem] md:mt-[5rem] lg:mt-[3rem] xl:mt-[4rem] xxl:mt-[5.3rem] xxxl:mt-[7.5rem] xxxl:mb-[3rem] xxxxl:mt-[10rem] xxxxl:mb-[5rem] justify-center items-center transition duration-300 
        ${
            totalTimeInMilliseconds
                ? "scale-150 md:mt-[6rem] lg:mt-[4rem] xl:mt-[4.4rem] xxl:mt-[5.2em] xxxl:mt-[6.5rem] xxxxl:mt-[8.5rem]"
                : "scale-100"
        }`}
        >
            <div className={`flex justify-center flex-col items-center`}>
                <div className="md:text-[1.4rem] xl:text-[1.6rem] xxl:text-[1.8rem] xxxl:text-[2.1rem] xxxxl:text-[3.2rem] text-[1.2rem]">
                    Your Time:
                </div>
                <div className="md:text-[2.3rem] xl:text-[2.5rem] xxl:text-[2.7rem] xxxl:text-[3rem] xxxxl:text-[4.3rem] text-[2rem] flex justify-center gap-1">
                    <TimeDisplay time={minutes.current} unit="min" />:
                    <TimeDisplay time={seconds.current} unit="sec" />:
                    <TimeDisplay time={milliseconds.current} unit="ms" />
                </div>
            </div>
        </div>
    );
}
