import { AppButton } from "./AppButton";

function PopupAuth(porps) {
    const { onClose } = porps;
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="relative bg-brown-100 rounded-lg shadow-lg w-[400px] p-6">

                    {/* ปุ่มปิด */}
                    <button
                        className="absolute top-3 right-3 text-brown-600 hover:text-brown-400"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                    {/* เนื้อหา */}
                    <div className="flex flex-col items-center gap-6 my-6 text-center">
                        <h1 className="font-bold text-2xl leading-snug">
                            Create an account to continue
                        </h1>

                        <AppButton style="dark">Create account</AppButton>

                        <p className="text-sm">
                            <span className="text-brown-400">Already have an account? </span>
                            <a
                                href="#"
                                className="text-brown-600 underline hover:text-brown-400"
                            >
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopupAuth;