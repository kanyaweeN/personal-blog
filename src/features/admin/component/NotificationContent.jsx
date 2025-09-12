import { AppButton } from "../../common/AppButton";

function NotificationContent(props) {
    const { image, date } = props;
    return (
        <main className="flex-1 p-10">
            {/* Header */}
            <header className="flex justify-between items-center mb-5 border-b pb-5">
                <h2 className="text-xl font-bold">
                    Notification
                </h2>
            </header>

            <div className="flex not-last:border-b items-start justify-start">
                <img className="w-9 h-9 rounded-full mr-2" src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" alt="Tomson P." />

                <div className="flex flex-col w-full">
                    <span
                        className="font-bold text-brown-500">
                        Jacob Lash
                    </span>
                    <p>
                        I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.
                    </p>
                    <p className="text-xs text-orange">
                        4 hours ago
                    </p>
                </div>
                <a
                    className="text-xs underline hover:text-brown-300 cursor-pointer"
                    onClick={() => { }}
                >
                    view
                </a>
            </div>
        </main >
    )
}

export default NotificationContent;


