import { Search } from "lucide-react";
import { useState } from "react";

function InputSearch({ value, onChange, suggestions = [], onSelectSuggestion }) {
    const [focused, setFocused] = useState(false);

    return (
        <div className="relative w-full">
            {/* ช่องค้นหา */}
            <div className="relative">
                <input
                    className="w-full px-4 py-2 pl-10 
                    rounded-lg border border-gray-300 
                    text-gray-700 bg-white 
                    focus:outline-none focus:ring-1 focus:ring-brown-400 transition-all"
                    type="text"
                    placeholder="Search article..."
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                />
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />
            </div>

            {/* กล่อง suggestion */}
            {focused && value && (
                <div
                    className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg 
                               overflow-hidden animate-fadeIn"
                >
                    {suggestions.length > 0 ? (
                        suggestions.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                className={`w-full text-left px-4 py-3 transition-all duration-200 
                                            ${index !== suggestions.length - 1 ? "border-b border-gray-100" : ""} 
                                            hover:bg-brown-200`}
                                onMouseDown={() =>
                                    onSelectSuggestion && onSelectSuggestion(item)
                                }
                            >
                                <div className="font-medium text-gray-800 truncate">
                                    {item.title}
                                </div>
                                {item.description && (
                                    <div className="text-sm text-gray-500 truncate mt-1">
                                        {item.description}
                                    </div>
                                )}
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-4 text-center text-gray-500 text-sm select-none">
                            ไม่พบผลลัพธ์ที่ค้นหา
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default InputSearch;
