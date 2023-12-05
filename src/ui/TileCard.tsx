import { ReactNode } from "react";
import { ITile } from "../components/tiles/Tile";
import {
    tilesCardSize12,
    tilesCardSize16,
    tilesCardSize20,
    tilesCardSize24,
} from "../components/utils/static-helpers/break-points";

interface ITileCardProps {
    children: ReactNode;
    matchedPairs: number[];
    tileDetails: ITile;
    gameSize: number;
    gameMode: string;
}

export default function TileCard({
    children,
    matchedPairs,
    tileDetails,
    gameSize,
    gameMode,
}: ITileCardProps) {
    const nonColorModes = "bg-blue-300 hover:from-blue-300 hover:to-blue-600";
    const colorsModeColors = "bg-slate-800 hover:from-slate-800 hover:to-black";

    // sizing of tiles per game size
    const gameSize12 =
        gameSize === 12 &&
        `${tilesCardSize12.xxxs} ${tilesCardSize12.xxs} ${tilesCardSize12.xs} ${tilesCardSize12.sm} ${tilesCardSize12.md} ${tilesCardSize12.lg} ${tilesCardSize12.xl} ${tilesCardSize12.xxl} ${tilesCardSize12.xxxl} ${tilesCardSize12.xxxxl}`;
    const gameSize16 =
        gameSize === 16 &&
        `${tilesCardSize16.xxxs} ${tilesCardSize16.xxs} ${tilesCardSize16.xs} ${tilesCardSize16.sm} ${tilesCardSize16.md} ${tilesCardSize16.lg} ${tilesCardSize16.xl} ${tilesCardSize16.xxl} ${tilesCardSize16.xxxl} ${tilesCardSize16.xxxxl}`;
    const gameSize20 =
        gameSize === 20 &&
        `${tilesCardSize20.xxxs} ${tilesCardSize20.xxs} ${tilesCardSize20.xs} ${tilesCardSize20.sm} ${tilesCardSize20.md} ${tilesCardSize20.lg} ${tilesCardSize20.xl} ${tilesCardSize20.xxl} ${tilesCardSize20.xxxl} ${tilesCardSize20.xxxxl}`;
    const gameSize24 =
        gameSize === 24 &&
        `${tilesCardSize24.xxxs} ${tilesCardSize24.xxs} ${tilesCardSize24.xs} ${tilesCardSize24.sm} ${tilesCardSize24.md} ${tilesCardSize24.lg} ${tilesCardSize24.xl} ${tilesCardSize24.xxl} ${tilesCardSize24.xxxl} ${tilesCardSize24.xxxxl}`;

    return (
        <div
            className={`lg:w-[13%] h-[100%] rounded-md border border-slate-400 shadow-md hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br transition duration-100
            ${
                matchedPairs.includes(tileDetails.matchingId)
                    ? "bg-transparent scale-75 hover:scale-0 transition-all duration-300 border-none shadow-none pointer-events-none"
                    : "visible"
            }
            ${gameMode !== "colors" ? nonColorModes : colorsModeColors}
            ${gameSize12} ${gameSize16} ${gameSize20} ${gameSize24}
            `}
        >
            {children}
        </div>
    );
}
