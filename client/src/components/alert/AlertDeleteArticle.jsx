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

function AlertDeleteArticle({ open, onOpenChange }) {
    const navigate = useNavigate();
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
                                Delete article
                            </span>
                            <span>
                                Do you want to delete this article?
                            </span>
                            <span className='space-x-3' >
                                <AppButton
                                    // onClick={() => navigate("/profile/reset-password")}
                                    onClick={() => {
                                        onOpenChange(false);   // ปิด popup
                                        // navigate(-1);          // กลับไปหน้าเดิม
                                    }}
                                >
                                    Cancel
                                </AppButton>
                                <AppButton
                                    style='dark'
                                    onClick={() => navigate("/admin/article-manament")}
                                >
                                    Reset
                                </AppButton>
                            </span>
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AlertDeleteArticle;