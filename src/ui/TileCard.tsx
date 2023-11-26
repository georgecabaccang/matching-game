import { ReactNode } from "react";
import { ITile } from "../components/tiles/Tile";

interface ITileCardProps {
    children: ReactNode;
    matchedPairs: number[];
    tileDetails: ITile;
}

export default function TileCard({ children, matchedPairs, tileDetails }: ITileCardProps) {
    const numbersModeColors = "bg-blue-300 hover:from-blue-300 hover:to-blue-600";
    const colorsModeColors = "bg-slate-800 hover:from-slate-800 hover:to-black";

    return (
        <div
            className={`lg:w-[13%] lg:h-[5.2rem] xl:h-[6rem] rounded-md border border-slate-400 shadow-md hover:shadow-lg  hover:scale-105 hover:bg-gradient-to-br transition duration-100
            ${matchedPairs.includes(tileDetails.matchingId) ? "invisible" : "visible"}
            ${tileDetails.color ? colorsModeColors : numbersModeColors}
            `}
        >
            {children}
        </div>
    );
}
