import clsx from "clsx";
import { ImageIcon } from "lucide-react";

export default function ThumbnailPreview({
    src,
    alt = "thumbnail",
    style = "",
}) {
    const hasImage = Boolean(src);

    return (
        <div
            className={clsx(
                "flex items-center justify-center w-64 h-40 border rounded-md bg-brown-200 overflow-hidden",
                style
            )}
        >
            {hasImage ? (
                <img
                    src={src}
                    alt={alt}
                    className="h-auto w-auto max-h-40 max-w-full object-cover"
                />
            ) : (
                <ImageIcon className="mx-auto h-8 w-8 text-brown-500" />
            )}
        </div>
    );
}
