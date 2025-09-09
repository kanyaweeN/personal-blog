
import { Search } from "lucide-react";

function InputSearch({ value, onChange }) {
    return (
        <>
            <div className="relative w-full ">
                <input
                    className="w-full p-4 rounded-xl border border-gray-300 text-gray-700 bg-white focus:outline-none"
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={onChange}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}
                />
            </div>
        </>
    );
}

export default InputSearch;