
import { Search } from "lucide-react";

function InputSearch({ value, onChange, suggestions = [], onSelectSuggestion }) {
    return (
        <>
            <div className="relative w-full ">
                <input
                    className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-600 bg-white focus:outline-none"
                    type="text"
                    placeholder="Search"
                    value={value}
                    onChange={onChange}
                />
                <Search
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20}
                />

                {value && suggestions.length > 0 && (
                    <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-auto">
                        {suggestions.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-xl"
                                onClick={() => onSelectSuggestion && onSelectSuggestion(item)}
                            >
                                <div className="text-gray-800 font-medium line-clamp-2">{item.title}</div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default InputSearch;