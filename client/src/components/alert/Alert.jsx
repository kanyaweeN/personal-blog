import { useNavigate } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { AppButton } from '../button/AppButton';

function Alert(
    {
        open,
        onOpenChange,
        title,
        detail,
        acceptOnClick,
        acceptText,
        cancelText
    }
) {
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
                                {title}
                            </span>
                            <span>
                                {detail}
                            </span>
                            <span className='space-x-3' >
                                <AppButton
                                    // onClick={() => navigate("/profile/resetpassword")}
                                    onClick={() => {
                                        onOpenChange(false);   // ปิด popup
                                        // navigate(-1);          // กลับไปหน้าเดิม
                                    }}
                                >
                                    {cancelText}
                                </AppButton>
                                <AppButton
                                    style='dark'
                                    onClick={acceptOnClick}
                                >
                                    {acceptText}
                                </AppButton>
                            </span>
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Alert;