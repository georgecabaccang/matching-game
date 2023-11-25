import { ReactNode } from "react";
import { ITile } from "../components/tiles/Tile";

interface ITileCardProps {
    children: ReactNode;
    matchedPairs: number[];
    tileDetails: ITile;
}

export default function TileCard({ children, matchedPairs, tileDetails }: ITileCardProps) {
    return (
        <div
            className={`lg:w-[13%] lg:h-[5.2rem] xl:h-[6rem] rounded-md border border-slate-400 shadow-md hover:shadow-lg bg-blue-300 hover:from-blue-300 hover:scale-105 hover:bg-gradient-to-br hover:to-blue-600 transition duration-100
            ${matchedPairs.includes(tileDetails.matchingId) ? "invisible" : "visible"}`}
        >
            {children}
        </div>
    );
}
