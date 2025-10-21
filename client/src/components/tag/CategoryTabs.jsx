import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function CategoryTabs({
    categoriesData,
    activeCategory,
    handleCategory,
}) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
        scrollRef.current.scrollTo({
            left: scrollLeft + scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative w-full flex items-center">
            {/* ปุ่มเลื่อนซ้าย */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-1 m-1 hidden md:flex"
            >
                <ChevronLeft className="w-5 h-5 text-brown-500" />
            </button>

            {/* แถวปุ่ม category */}
            <div
                ref={scrollRef}
                className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth"
            >
                <div className="flex gap-3 min-w-max px-10 py-2">
                    {categoriesData.map((item, index) => (
                        <button
                            key={`${item.id}-${index}`}
                            className={`
                                ${item.name === activeCategory
                                    ? "bg-brown-300 text-brown-600 font-semibold shadow-sm"
                                    : "text-brown-400 hover:bg-brown-200 hover:text-brown-600"}
                                px-5 py-2 rounded-full transition-all duration-200 shrink-0
                            `}
                            disabled={item.name === activeCategory}
                            onClick={() => handleCategory(item.name)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* ปุ่มเลื่อนขวา */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-1 m-1 hidden md:flex"
            >
                <ChevronRight className="w-5 h-5 text-brown-500" />
            </button>
        </div>
    );
}
