import { useContext, useRef, useEffect } from "react";
import { TimerContext } from "../../store/timer-context/TimerContext";
import TimeDisplay from "./TimeDisplay";

export default function Timer() {
    const { time } = useContext(TimerContext);

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

    return (
        <div className={`flex justify-center flex-col items-center`}>
            <div className="text-[1.2rem]">Your Time:</div>
            <div className="text-[2rem] flex justify-center gap-1">
                <TimeDisplay time={minutes.current} unit="min" />:
                <TimeDisplay time={seconds.current} unit="sec" />:
                <TimeDisplay time={milliseconds.current} unit="ms" />
            </div>
        </div>
    );
}
