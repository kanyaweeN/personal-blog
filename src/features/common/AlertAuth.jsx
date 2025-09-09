import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { AppButton } from "./AppButton";

function AlertAuth({ open, onOpenChange }) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogTitle>

                </AlertDialogTitle>
                <AlertDialogHeader>
                    <AlertDialogCancel className="absolute top-3 right-3 text-brown-600 hover:text-brown-400 border-0">X</AlertDialogCancel>
                    <AlertDialogDescription>
                        <span className="flex flex-col items-center gap-6 my-6 text-center">
                            <span className="font-bold text-2xl leading-snug">
                                Create an account to continue
                            </span>

                            <AppButton style="dark">Create account</AppButton>

                            <span >
                                <span className="text-brown-400">Already have an account? </span>
                                <a
                                    href="#"
                                    className="text-brown-600 underline hover:text-brown-400"
                                >
                                    Log in
                                </a>
                            </span>
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default AlertAuth;