import { Loader2 } from 'lucide-react';

export const LoadingPage = ({
    size = 'md',
    color = 'brown',
    className = '',
    text = 'Loading...'
}) => {
    const sizes = {
        xs: { dot: 'w-1.5 h-1.5', gap: 'gap-1.5' },
        sm: { dot: 'w-2 h-2', gap: 'gap-2' },
        md: { dot: 'w-3 h-3', gap: 'gap-2' },
        lg: { dot: 'w-4 h-4', gap: 'gap-3' },
        xl: { dot: 'w-6 h-6', gap: 'gap-4' }
    };

    const colors = {
        blue: 'from-cyan-400 to-blue-500',
        purple: 'from-purple-400 to-purple-600',
        pink: 'from-pink-400 to-rose-500',
        green: 'from-green-400 to-emerald-500',
        orange: 'from-orange-400 to-red-500',
        red: 'from-red-400 to-red-600',
        yellow: 'from-yellow-400 to-amber-500',
        gray: 'from-gray-400 to-gray-600',
        brown: 'from-brown-300 to-brown-400'
    };

    const { dot, gap } = sizes[size] || sizes.md;
    const gradient = colors[color] || colors.blue;

    return (
        <div
            className={`flex flex-col justify-center items-center ${gap} ${className}`}
            role="status"
            aria-label="Loading">
            {/* {[0, 0.1, 0.2].map((delay, i) => (
                <div
                    key={i}
                    className={`${dot} bg-gradient-to-r ${gradient} rounded-full animate-bounce`}
                    style={{ animationDelay: `${delay}s` }}
                />
            ))} */}
            {/* <LoaderCircle /> */}
            <div className="flex flex-col items-center ">
                <Loader2 className="h-10 w-10 animate-spin" />
                {text}
            </div>
            {/* <LoadingScreen text={text} /> */}
        </div>
    );
};