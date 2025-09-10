// src/components/common/useAppToast.js
import { toast } from "sonner";

export function useAppToast() {
    const success = (title, description) => {
        toast(title, {
            description,
            style: {
                background: '#12B279',
                color: 'white',
                borderRadius: '12px',
                padding: '16px',
                position: 'relative',
                border: '1px solid #12B279',
            },
            cancel: {
                label: "X",
            },
            cancelButtonStyle: {
                background: 'transparent',
                color: 'white',
                position: 'absolute',
                top: '8px',
                right: '8px',
                fontSize: '18px',
                cursor: 'pointer'
            }
        });
    };

    const error = (title, description) => {
        toast(title, {
            description,
            style: {
                background: '#EF4444',
                color: 'white',
                borderRadius: '12px',
                padding: '16px',
                position: 'relative',
                border: '1px solid #EF4444',
            },
            cancel: {
                label: "X",
            },
            cancelButtonStyle: {
                background: 'transparent',
                color: 'white',
                position: 'absolute',
                top: '8px',
                right: '8px',
                fontSize: '18px',
                cursor: 'pointer'
            }
        });
    };

    return { success, error };
}
