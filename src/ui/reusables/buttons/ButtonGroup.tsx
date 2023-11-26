import { ReactNode } from "react";

interface IButtonGroup {
    direction: string;
    children: ReactNode;
}

export default function ButtonGroup({ direction, children }: IButtonGroup) {
    return (
        <div
            className={`flex flex-${direction} gap-5 flex-wrap justify-center items-center w-[100%]`}
        >
            {children}
        </div>
    );
}
