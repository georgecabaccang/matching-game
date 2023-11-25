export default function AddScoreForm() {
    return (
        <div className="w-[50%] flex items-center flex-col">
            <span className="text-[1.1rem] font-bold">Congratulations!</span>
            <span className="text-blue-400"> You made the Top 10!</span>
            <label htmlFor="enter-name" className="text-[0.8rem] font-semibold">
                Enter Desired Name:
            </label>
            <input
                id="enter-name"
                type="text"
                autoFocus
                maxLength={20}
                className="px-[4rem] overflow-x-visible bg-transparent border-b-2 w-[100%] text-center border-blue-200 focus:outline-none py-2"
            />
            <span className="text-[0.6rem] mt-2">Max of 20 Characters</span>
        </div>
    );
}
