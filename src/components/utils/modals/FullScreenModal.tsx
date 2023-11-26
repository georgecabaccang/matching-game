import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ButtonGroup from "../../../ui/reusables/buttons/ButtonGroup";
import Button from "../../../ui/reusables/buttons/Button";

interface IChoices {
    label: string;
    value: string | number;
}

interface IFullScreenModal {
    choices?: IChoices[];
    setStateAction: Dispatch<SetStateAction<any>>;
    showBack?: boolean;
    head?: string;
    body?: string;
    backAction?: () => void;
}

export default function FullScreenModal({
    choices,
    setStateAction,
    head,
    body,
    showBack,
    backAction,
}: IFullScreenModal) {
    const [isMounted, setIsMounted] = useState(false);

    const modalTimeout = useRef(0);
    useEffect(() => {
        modalTimeout.current = setTimeout(() => {
            setIsMounted(true);
        }, 100);

        return () => {
            clearTimeout(modalTimeout.current);
        };
    }, []);

    return (
        <div
            className={`absolute top-0 z-50 left-0 bg-blue-400 bg-opacity-40 w-[100vw] h-[100vh] flex justify-center items-center`}
        >
            <div
                className={`relative bg-blue-50 flex flex-col justify-center items-center gap-4 h-auto max-h-[50%] max-w-[50%] px-20 py-8 rounded shadow-lg trasition duration-75 ease-in-out 
                ${isMounted ? "scale-100 visible" : "scale-50 invisible"}`}
            >
                {/* Start of back arrow */}
                {showBack && (
                    <button onClick={backAction} className="absolute top-1 left-1 w-[3rem]">
                        <svg
                            style={{
                                color: "#93c5fd",
                                filter: "drop-shadow(1px 2.5px 2px rgb(0 0 0 / 0.4))",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m14 7-5 5 5 5"
                                fill="#93c5fd"
                            ></path>
                        </svg>
                    </button>
                )}
                {/* End of back arrow */}

                {/* Start of head */}
                <div className="text-[1.2rem] font-bold">{head}</div>
                {/* Endof head */}

                {/* Start of body */}
                <div>{body}</div>
                {/* End of body */}

                {/* Start of buttons */}
                <div>
                    {choices && (
                        <ButtonGroup direction="row">
                            {choices.map((choice, index) => {
                                return (
                                    <Button
                                        key={index}
                                        label={choice.label}
                                        value={choice.value}
                                        action={setStateAction}
                                    />
                                );
                            })}
                        </ButtonGroup>
                    )}
                </div>
                {/* End of buttons */}
            </div>
        </div>
    );
}
