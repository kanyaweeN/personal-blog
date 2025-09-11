import clsx from "clsx";

function ProfileMenu({ currentPage = "profile", onClick }) {
    const baseColor = `flex items-center gap-2`
    const selectColor = {
        select: 'text-black cursor-default',
        unselect: 'text-muted-foreground transition-colors hover:text-foreground cursor-pointer'
    }

    return (

        <aside className="w-60 p-6">
            <nav className="space-y-4 text-brown-600">
                <a
                    onClick={currentPage == "profile" ? undefined : onClick}
                    className={clsx(baseColor, currentPage == "profile" ? selectColor.select : selectColor.unselect)}
                >
                    <span>👤</span> Profile
                </a>
                <a
                    onClick={currentPage == "reset" ? undefined : onClick}
                    className={clsx(baseColor, currentPage == "reset" ? selectColor.select : selectColor.unselect)}
                >
                    <span>🔑</span> Reset password
                </a>
            </nav>
        </aside >
    );
}

export default ProfileMenu;