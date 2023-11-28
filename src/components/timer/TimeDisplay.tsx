export default function TimeDisplay({ time, unit }: { time: string; unit: string }) {
    return (
        <div className="flex flex-col justify-center items-center mt-[0.15rem]">
            <div>{time}</div>
            <div className="text-[0.8rem] md:text-[1rem] -mt-2">{unit}</div>
        </div>
    );
}
