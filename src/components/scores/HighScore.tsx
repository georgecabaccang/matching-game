interface ILealderBoard {
    _id: string;
    name: string;
    time: number;
    size: number;
    mode: string;
}

interface IProps {
    leader: ILealderBoard;
    index: number;
}

export default function HighScore({ leader, index }: IProps) {
    return (
        <div className="h-[20%] w-[50%] flex justify-center items-center" key={leader._id}>
            <div className="flex gap-3 w-[100%] lg:px-8 xl:px-14 relative">
                <div className={`absolute ${index === 9 ? "-ml-[0.3rem]" : ""}`}>{`${
                    index + 1
                }`}</div>
                <div className="flex justify-between w-[100%] items-center ml-5">
                    <div className="">{leader.name}</div>
                    <div>{leader.time}</div>
                </div>
            </div>
        </div>
    );
}
