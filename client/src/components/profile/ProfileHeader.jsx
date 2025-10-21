import Userprofile from "../nav/Userprofile";

function ProfileHeader({ name, menuName }) {
    return (
        <div className="flex md:flex-row items-center justify-start md:gap-6 mb-6">
            <Userprofile
                style="w-10 h-10"
            />
            <span
                className="text-2xl border-r pr-3 text-brown-400">
                {name}
            </span>
            <span
                className="text-2xl font-bold pl-3">
                {menuName}
            </span>
        </div>
    );
}

export default ProfileHeader;