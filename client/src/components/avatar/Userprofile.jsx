import clsx from "clsx";
import { useAuth } from "@/contexts/authentication";
import userprofile from "../../assets/icons/userprofile.png";

export default function Userprofile({
    src,
    style,
}) {
    const { state } = useAuth();
    const avatarUrl = src || state?.user?.profilePic;

    return (
        <img
            src={avatarUrl || userprofile}
            alt="avatar"
            className={clsx("rounded-full object-cover", style)}
        />
    );
}
