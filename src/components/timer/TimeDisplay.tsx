export default function TimeDisplay({ time, unit }: { time: string; unit: string }) {
    return (
        <div className="flex flex-col justify-center items-center mt-[0.15rem]">
            <div>{time}</div>
            <div className="md:text-[1rem] -mt-2" style={{ fontSize: "0.37em" }}>
                {unit}
            </div>
        </div>
    );
}
