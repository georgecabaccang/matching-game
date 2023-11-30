import { SetStateAction, Dispatch } from "react";

interface IButton {
    label: string;
    value: string | number;
    action: Dispatch<SetStateAction<any>>;
}

export default function Button({ label, value, action }: IButton) {
    // just return value back up to whatever component used this button
    const handleClick = () => {
        action(value);
    };

    return (
        <>
            <button
                type="button"
                className="w-[45%] flex justify-center text-center px-5 py-2 rounded-md bg-blue-300 border border-blue-300 hover:border-blue-300 shadow-md hover:shadow-none hover:bg-blue-50 text-slate-600 font-semibold transition duration-75 hover:scale-95 "
                style={{ fontSize: "1em" }}
                onClick={handleClick}
            >
                {label}
            </button>
        </>
    );
}
