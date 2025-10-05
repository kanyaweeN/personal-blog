import { X, User, Lock } from "lucide-react";
import clsx from "clsx";

function ProfileMenu({ onClick }) {
    const baseColor = `flex items-center gap-2`
    const activeColor = {
        active: 'text-black cursor-default',
        unactive: 'text-muted-foreground transition-colors hover:text-foreground cursor-pointer'
    }

    const isActive = (basePath) => location.pathname === basePath;

    return (

        <aside className="w-60 p-6">
            <nav className="space-y-4 text-brown-600">
                <a
                    onClick={isActive("/profile") ? undefined : onClick}
                    className={clsx(baseColor, isActive("/profile") ? activeColor.active : activeColor.unactive)}
                >
                    <User className="h-5 w-5 mb-1" />
                    Profile
                </a>
                <a
                    onClick={isActive("/profile/resetpassword") ? undefined : onClick}
                    className={clsx(baseColor, isActive("/profile/resetpassword") ? activeColor.active : activeColor.unactive)}
                >
                    <Lock className="h-5 w-5 mb-1" />
                    Reset password
                </a>
            </nav>
        </aside >
    );
}

export default ProfileMenu;